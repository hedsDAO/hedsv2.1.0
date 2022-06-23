import { createModel } from "@rematch/core";
import type { RootModel } from ".";
import { doc, DocumentData, getDoc } from "firebase/firestore";
import { db } from "../index";

export const globalModel = createModel<RootModel>()({
	state: {
		current: ["", "", "", ""],
		payouts: { artist_eth: "", treasury_eth: "" },
		promo: "",
		tape_addresses: { ht1: "", ht2: "", ht3: "" },
		landing_title: '',
		tapes: {
			ht1: {
				mint_open: false,
				sample_link: false,
				sold_out: false,
				submissions_open: false,
				voting_open: false
			},
			ht2: {
				mint_open: false,
				sample_link: false,
				sold_out: false,
				submissions_open: false,
				voting_open: false
			},
			ht3: {
				mint_open: false,
				sample_link: false,
				sold_out: false,
				submissions_open: false,
				voting_open: false
			}
		}
	} as DocumentData,
	reducers: {
		setGlobalData: (state, payload: DocumentData) => payload || state
	},
	effects: (dispatch) => ({
		async getGlobalData() {
			const docRef = doc(db, "global", "2.0.1");
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				console.log();
				dispatch.globalModel.setGlobalData(docSnap.data());
			}
		}
	})
});
