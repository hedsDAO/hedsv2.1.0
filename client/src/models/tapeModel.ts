import { createModel } from "@rematch/core";
import type { RootModel } from ".";
import { TrackMetadata } from "./common";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../index";

export interface TapeState {
	space?: string;
	tape: string;
	tracks: [TrackMetadata];
}

export const tapeModel = createModel<RootModel>()({
	state: {} as TapeState,
	reducers: {
		setTapeData: (state, tracks) => ({ ...state, tracks }),
	},
	effects: () => ({
		async getTapeData([space, tape, id]: Array<string>) {
			const docRef = doc(db, "audio", space || "heds");
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				this.setTapeData(docSnap.data()?.[tape]?.[+id]);
			}
		},
	}),
});
