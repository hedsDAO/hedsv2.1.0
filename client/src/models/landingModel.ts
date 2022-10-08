import { createModel } from "@rematch/core";
import type { RootModel } from ".";
import { doc, DocumentData, getDoc } from "firebase/firestore";
import { db } from "../index";

export const landingModel = createModel<RootModel>()({
	state: {
		textBlock: {
			tapeName: "",
			tapeTag: "",
			artistName: "",
			artistTag: "",
		},
		media: {
			lg: "",
			md: "",
			sm: "",
		},
		linkButton: {
			link: "",
			text: "",
		},
	} as DocumentData,
	reducers: {
		setLandingData: (state, payload: DocumentData) => payload || state,
	},
	effects: () => ({
		async getLandingData() {
			const docRef = doc(db, "landing", "joshpan");
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				this.setLandingData(docSnap.data());
			}
		},
	}),
});
