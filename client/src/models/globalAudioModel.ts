import { createModel } from "@rematch/core";
import type { RootModel } from ".";

interface TrackMetadata {
	no?: string;
	audio?: string;
	video?: string;
	artist?: string;
	artist_img?: string;
	wallet?: string;
	social?: string;
}

interface TapeMetadata {
	name?: string;
	tape?: string;
	id?: string;
	tape_img?: string;
}

interface TrackDetails {
	track: TrackMetadata;
	tape: TapeMetadata;
	space?: string;
}

interface GlobalAudioState {
	isPlaying?: boolean;
	isLoading?: boolean;
	trackDetails?: TrackDetails;
	queue?: [TrackDetails];
	isOpen: boolean;
}

export const globalAudioModel = createModel<RootModel>()({
	state: {
		isOpen: false,
		isLoading: false,
	} as GlobalAudioState,
	reducers: {
		setGlobalAudio: (state, payload: GlobalAudioState) => payload || state,
		setGlobalTrack: (state, payload: GlobalAudioState) => ({ ...state, payload }),
		setIsPlaying: (state, isPlaying: boolean) => ({ ...state, isPlaying }),
		setIsLoading: (state, isLoading: boolean) => ({ ...state, isLoading }),
		setIsOpen: (state, isOpen: boolean) => ({ ...state, isOpen }),
	},
	effects: () => ({
		async getGlobalAudio([track, tape, space]: [TrackMetadata, TapeMetadata, string | void]) {
			const trackDetails = { track, tape, space: space || "heds" };
			this.setGlobalAudio({ isPlaying: true, trackDetails, queue: [trackDetails], isOpen: true });
		},
	}),
});
