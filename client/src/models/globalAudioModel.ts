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
    setGlobalTrack: (state, payload: GlobalAudioState) => ({ ...state, payload }),
  },
  effects: () => ({
    async getGlobalAudio(payload: GlobalAudioState) {
      this.setGlobalAudio(payload);
    },
  }),
});
