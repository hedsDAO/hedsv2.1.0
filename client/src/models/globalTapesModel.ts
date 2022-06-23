import { createModel } from "@rematch/core";
import type { RootModel } from ".";
import { doc, DocumentData, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../index";

interface TapeDataLinks {
	opensea: string;
	etherscan: string;
	snapshot: string;
	splits: string;
	heds: string;
}

interface TapeDataSample {
	audio: string;
	artist: string;
	wallet_id: string;
	image: string;
	bpm: number;
}

interface TapeDataQuantity {
	total: number;
	available: number;
	sold: number;
}

export interface TapeData {
	id: string;
	contract: string;
	color: string;
	name: string;
	links: TapeDataLinks;
	status: number;
	image: string;
	sample: TapeDataSample;
	live: false;
	season: number;
	quantity: TapeDataQuantity;
	no: number;
	active: boolean;
	countdown: boolean;
	voting: boolean;
}

interface GlobalTapesModel {
	hedstapes?: Array<TapeData>;
}

export const globalTapesModel = createModel<RootModel>()({
	state: {
		tapeData: [],
	} as GlobalTapesModel,
	reducers: {
		setGlobalTapesData: (state, payload: DocumentData) => payload || state,
	},
	effects: (dispatch) => ({
		async getGlobalTapesData(space : string) {
			const docRef = doc(db, "spaces", space || "heds");
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				console.log();
				dispatch.globalTapesModel.setGlobalTapesData(docSnap.data());
			}
		},
		async updateTapeStatus(tapeNum: string) {
			const docRef = doc(db, "global", "tapes");
			const tapeData = await getDoc(docRef);
			try {
				if (tapeData.exists()) {
					let currentTapes = tapeData.data().tapeData;
					currentTapes[parseInt(tapeNum) - 1].status = "mint";
					currentTapes[parseInt(tapeNum) - 1].countdown = false;
					await updateDoc(docRef, {
						tapeData: currentTapes
					});
					this.getGlobalTapesData();
				}
			} catch (e) {
				console.log(e);
			}
		},
	}),
});
