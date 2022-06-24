import { createModel } from "@rematch/core";
import type { RootModel } from ".";

interface TrackDetails {
  src?: string;
  artist?: string;
  artist_img?: string;
  tape?: string;
  tape_img?: string;
  duration?: number;
}

interface GlobalAudioState {
  origin?: string;
  hasLoaded: boolean;
  isPlaying?: boolean;
  overlay: boolean;
  trackDetails?: TrackDetails;
}

export const globalAudioModel = createModel<RootModel>()({
  state: {
    hasLoaded: false,
    overlay: false,
  } as GlobalAudioState,
  reducers: {
    setGlobalAudio: (state, payload: GlobalAudioState) => payload || state,
    setGlobalTrack: (state, trackDetails: TrackDetails) => ({ ...state, trackDetails }),
  },
  effects: () => ({
    async getGlobalAudio(trackDetails: GlobalAudioState) {
      this.setGlobalAudio(trackDetails);
    },
  }),
});
