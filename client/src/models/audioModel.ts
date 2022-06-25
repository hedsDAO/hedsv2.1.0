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
	audio: {
		track: [TrackMetadata];
		tape: TapeMetadata;
		space: "";
	};
}

export const audioModel = createModel<RootModel>()({
	state: {} as AudioState,
	reducers: {
		setAudio: (state, payload: AudioState) => payload || state,
	},
	effects: () => ({
		async getAudioData([{ space, tape, id }, tapeData]: [MediaQueryParams, TapeData | void]) {
			const docRef = doc(db, "audio", space || "heds");
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				console.log(tapeData, 'help')
				this.setAudio({
					audio: {
						track: docSnap.data()?.[tape]?.[id],
						tape: { name: tapeData?.name, tape, id, tape_img: tapeData?.image },
						space: space || "heds",
					},
				});
			}
		},
	}),
});
