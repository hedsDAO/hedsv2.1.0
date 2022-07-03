import { createModel } from "@rematch/core";
import type { RootModel } from ".";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../index";

export interface GlobalState {
	spotlight: {
		space: string;
		tape: number;
		text: string;
		description: string;
	};
}

export const globalModel = createModel<RootModel>()({
	state: {
		spotlight: {
			space: "",
			tape: 0,
			text: "",
		},
	} as GlobalState,
	reducers: {
		setGlobalData: (state, payload: GlobalState) => payload || state,
	},
	effects: () => ({
		async getGlobalData() {
			const docRef = doc(db, "global", "2.1.0");
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				this.setGlobalData(docSnap.data());
			}
		},
	}),
});
