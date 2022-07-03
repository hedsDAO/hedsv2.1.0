import { createModel } from "@rematch/core";
import type { RootModel } from ".";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../index";
import { PlayerSize, TrackMetadata } from "./common";
import { TapeData } from "./spaceModel";

export interface AudioState {
	currentTrack: number;
	tracks: Array<TrackMetadata>;
	tapes: Array<TapeData>;
	playerSize: PlayerSize;
	isPlaying: boolean;
	isLoading: boolean;
	currentTime: [string, number];
	duration: [string, number];
	volume: number;
}

export const audioModel = createModel<RootModel>()({
	state: {
		playerSize: PlayerSize.HIDDEN,
		isPlaying: false,
		isLoading: false,
		volume: 0,
	} as AudioState,
	reducers: {
		setAudio: (state, tracks) => ({ ...state, tracks }),
		setTapes: (state, tapes) => ({ ...state, tapes }),
		setPlayerSize: (state, playerSize) => ({ ...state, playerSize }),
		setIsPlaying: (state, isPlaying) => ({ ...state, isPlaying }),
		setVolume: (state, volume) => ({ ...state, volume }),
		setCurrentTime: (state, currentTime) => ({ ...state, currentTime }),
		setDuration: (state, duration) => ({ ...state, duration }),
		setIsLoading: (state, isLoading) => ({ ...state, isLoading }),
		setCurrentTrack: (state, currentTrack: number) => ({ ...state, currentTrack }),
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
	}),
});
