import { createModel } from "@rematch/core";
import type { RootModel } from ".";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../index";

export interface ExploreState {
	spotlight: {
		space: string;
		tape: string;
		id: number;
		text: string;
		description: string;
	};
}

export const exploreModel = createModel<RootModel>()({
	state: {} as ExploreState,
	reducers: {
		setExploreData: (state, payload: ExploreState) => payload || state,
	},
	effects: () => ({
		async getExploreData() {
			const docRef = doc(db, "explore", "v2.1.0");
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				this.setExploreData(docSnap.data());
			}
		},
	}),
});
