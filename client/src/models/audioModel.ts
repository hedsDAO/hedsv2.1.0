import { createModel } from "@rematch/core";
import type { RootModel } from ".";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../index";
import { PlayerSize, TrackMetadata, SampleData } from "./common";
import { TapeData } from "./spaceModel";

export interface AudioState {
	currentTrack: number;
	tracks: Array<TrackMetadata>;
	tapes: Array<TapeData>;
	samples: Array<SampleData>;
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
		setAudio: (state, tracks: Array<TrackMetadata>) => ({ ...state, tracks }),
		setSamples: (state, samples: Array<SampleData>) => ({ ...state, samples }),
		setTapes: (state, tapes: Array<TapeData>) => ({ ...state, tapes }),
		setPlayerSize: (state, playerSize: PlayerSize) => ({ ...state, playerSize }),
		setIsPlaying: (state, isPlaying: boolean) => ({ ...state, isPlaying }),
		setIsSample: (state, isSample: boolean) => ({ ...state, isSample }),
		setVolume: (state, volume: number) => ({ ...state, volume }),
		setCurrentTime: (state, currentTime: [string, number]) => ({ ...state, currentTime }),
		setDuration: (state, duration: [string, number]) => ({ ...state, duration }),
		setIsLoading: (state, isLoading: boolean) => ({ ...state, isLoading }),
		setCurrentTrack: (state, currentTrack: number) => ({ ...state, currentTrack }),
		setAudioOff: (state, payload) => payload || state,
	},
	effects: () => ({
		async getTrackData() {
			const docRef = doc(db, "audio", "heds");
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				const tracks = Object.values(docSnap.data()?.hedstape).flat();
				this.setAudio(tracks);
			}
		},
		async getTapeData() {
			const docRef = doc(db, "spaces", "hedsv2.1");
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				const tapes = Object.values(docSnap.data()?.hedstape).flat();
				this.setTapes(tapes);
			}
		},
		async getSamples() {
			const docRef = doc(db, "spaces", "hedsv2.1");
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				let sampleTank: Array<SampleData> = [];
				let tapeTank: Array<TapeData | any> = Object.values(docSnap.data()?.hedstape).flat();
				tapeTank.map((tapeData) => sampleTank.push(tapeData?.sample));
				this.setSamples(sampleTank);
			}
		},
	}),
});
