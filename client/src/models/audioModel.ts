import { createModel } from "@rematch/core";
import type { RootModel } from ".";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../index";
import { PlayerSize, TrackMetadata, SampleData } from "./common";
import { TapeData } from "./spaceModel";

export interface AudioState {
	currentTrack: number;
	currentTapeId: any;
	currentTape: string;
	tracks: {[key:string] : [TrackMetadata]};
	tapes: {[key:string] : TapeData};
	samples: {[key:string] : SampleData};
	playerSize: PlayerSize;
	isPlaying: boolean;
	isLoading: boolean;
	currentTime: [string, number];
	duration: [string, number];
	volume: number;
	isSample: boolean;
}

export const audioModel = createModel<RootModel>()({
	state: {
		playerSize: PlayerSize.HIDDEN,
		isPlaying: false,
		isLoading: false,
		volume: 0,
	} as AudioState,
	reducers: {
		setAudio: (state, tracks: {[key:string] : [TrackMetadata]}) => ({ ...state, tracks }),
		setSamples: (state, samples: {[key:string] : SampleData}) => ({ ...state, samples }),
		setTapes: (state, tapes: {[key:string] :TapeData}) => ({ ...state, tapes }),
		setPlayerSize: (state, playerSize: PlayerSize) => ({ ...state, playerSize }),
		setIsPlaying: (state, isPlaying: boolean) => ({ ...state, isPlaying }),
		setIsSample: (state, isSample: boolean) => ({ ...state, isSample }),
		setVolume: (state, volume: number) => ({ ...state, volume }),
		setCurrentTime: (state, currentTime: [string, number]) => ({ ...state, currentTime }),
		setDuration: (state, duration: [string, number]) => ({ ...state, duration }),
		setIsLoading: (state, isLoading: boolean) => ({ ...state, isLoading }),
		setCurrentTrack: (state, currentTrack: number) => ({ ...state, currentTrack }),
		setCurrentTapeId: (state, currentTapeId: any) => ({ ...state, currentTapeId }),
		setCurrentTape: (state, currentTape: string) => ({ ...state, currentTape }),
		setAudioOff: (state, payload) => {
			const newState = { ...state };
			const { tracks, tapes, samples } = newState;
			return { ...payload, tracks, tapes, samples };
		},
	},
	effects: () => ({
		async getTrackData([space, tape] : [string | void, string]) {
			const docRef = doc(db, "audio", space || "heds");
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				this.setAudio(docSnap.data()?.[tape]);
			}
		},
		async getTapeData([space, tape]: [string | void, string]) {
			const docRef = doc(db, "spaces", space || "heds");
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				const tapes = docSnap.data()?.[space || "heds"]?.[tape];
				this.setTapes((tapes));
			}
		},
		async getSamples([space, tape]: [string | void, string]) {
			const docRef = doc(db, "spaces", space || "heds");
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				let sampleTank: {[id:string] : SampleData} = {};
				let tapeTank: {[id: string] : TapeData} = docSnap.data()?.[space || "heds"]?.[tape];
				for (let id in tapeTank) sampleTank[id] = tapeTank[id].sample;
				this.setSamples(sampleTank);
			}
		},
	}),
});
