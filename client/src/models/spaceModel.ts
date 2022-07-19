import { createModel } from "@rematch/core";
import type { RootModel } from ".";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../index";

export interface TapeData {
	sample: {
		artist: string;
		audio: string;
		video: string;
		bpm: string;
		image: string;
		wallet: string;
	};
	tape: {
		id: number;
		no: string;
		image: string;
		name: string;
		description: string;
		contract: string;
		duration: string;
		quantity: string;
		season: string;
		tracks: number;
	};
	links: {
		etherscan: string;
		route: string;
		opensea: string;
		snapshot?: string;
		splits?: string;
	};
	status: {
		countdown: boolean;
		status: string;
		time: string;
	};
	collab: {
		name: string;
		image: string;
	};
}

interface SpaceData {
	[tape: string]: Array<TapeData>;
}

export const spaceModel = createModel<RootModel>()({
	state: {} as SpaceData,
	reducers: {
		setSpaceData: (state, payload: SpaceData) => payload || state,
	},
	effects: (dispatch) => ({
		async getSpaceData(space?: string) {
			const docRef = doc(db, "spaces", space || "hedsv2.1");
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				dispatch.spaceModel.setSpaceData(docSnap.data());
			}
		},
	}),
});
