import { createModel } from "@rematch/core";
import type { RootModel } from ".";
import { MediaQueryParams } from "./common";
import { TapeData } from "./globalTapesModel";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../index";

export interface TrackMetadata {
	no?: string;
	audio?: string;
	video?: string;
	artist?: string;
	artist_img?: string;
	wallet?: string;
	social?: string;
}

interface TapeMetadata {
	name?: string;
	tape?: string;
	id?: string;
	tape_img?: string;
}

interface AudioState {
	allTapes: Array<TapeData>;
	allAudio?: [[TrackMetadata]];
}

export const audioModel = createModel<RootModel>()({
	state: {
		allTapes: [],
		allAudio: [[{}]],
	} as AudioState,
	reducers: {
		setAudio: (state, payload) => state || payload,
		setAllAudio: (state, allAudio: any) => ({ ...state, allAudio }),
		setAllTapes: (state, allTapes: [TapeData]) => ({ ...state, allTapes }),
	},
	effects: () => ({
		async getAudioData([{ space, tape, id }, tapeData]: [MediaQueryParams, TapeData | void]) {
			const docRef = doc(db, "audio", space || "heds");
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				const audio = {
					track: docSnap.data()?.[tape]?.[id],
					tape: { name: tapeData?.name, tape, id, tape_img: tapeData?.image },
					space: space || "heds",
				};
				this.setAudio(audio);
			}
		},
		async getAllAudio(space: string) {
			const docRef = doc(db, "audio", space || "heds");
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				console.log(docSnap.data(), "data");
				this.setAllAudio(Object.values(docSnap.data().hedstape));
			}
		},
		async getAllTapes([space, tape]: [string | void, string]) {
			const docRef = doc(db, "spaces", space || "heds");
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				const tapesWithAudio = docSnap.data()?.hedstapes.filter((el: TapeData) => el.status > 8);
				this.setAllTapes(tapesWithAudio);
			}
		},
	}),
});
