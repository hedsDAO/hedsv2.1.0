import { createModel } from "@rematch/core";
import type { RootModel } from ".";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../index";

export interface ExploreState {
    spotlight: {
        space: string;
        tape: string;
        id: any;
        text: string;
        description: string;
    };
    underConstruction: boolean;
}

export const exploreModel = createModel<RootModel>()({
    state: {
		underConstruction: true,
	} as ExploreState,
    reducers: {
        setExploreData: (state, payload: ExploreState) => payload || state,
        setUnderConstruction: (state, payload: boolean) => ({
            ...state,
            underConstruction: payload,
        }),
    },
    effects: () => ({
        async getSpotlightData() {
            const docRef = doc(db, "explore", "ramzoid");
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                this.setExploreData({ spotlight: docSnap.data() });
            }
        },
        async getUnderConstruction() {
            const docRef = doc(db, "explore", "global");
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                if (docSnap.data().underConstruction) {
                    this.setExploreData({ underConstruction: docSnap.data().underConstruction });
                } else {
					this.setExploreData({ underConstruction: false });
				}
            }
        },
    }),
});
