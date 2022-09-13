import { createModel } from "@rematch/core";
import type { RootModel } from ".";
import { TrackMetadata } from "./common";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../index";
import { TapeData } from "./spaceModel";

export interface TapeState {
    tracks: { [id: string]: { [id: string]: [TrackMetadata] } };
    tapes: { [id: string]: { [id: string]: TapeData } };
}

export const tapeModel = createModel<RootModel>()({
    state: {} as TapeState,
    reducers: {
        setTapes: (state, tapes) => ({ ...state, tapes }),
        setTracks: (state, tracks) => ({ ...state, tracks }),
    },
    effects: () => ({
        async getTracks() {
            const docRef = doc(db, "audio", "heds");
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                this.setTracks(docSnap.data());
            }
        },
        async getTapes() {
            const docRef = doc(db, "spaces", "heds");
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                let tapeTank: { [id: string]: { [id: string]: TapeData } } = docSnap.data()?.["heds"];
                this.setTapes(tapeTank);
            }
        },
    }),
});
