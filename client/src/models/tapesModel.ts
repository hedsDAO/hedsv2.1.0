import { createModel } from "@rematch/core";
import type { RootModel } from ".";
import { doc, DocumentData, getDoc } from "firebase/firestore";
import { db } from "../index";

export interface TapeTrack {
  id: string;
  image: string;
  social_link: string;
  title: string;
  url: string;
  wallet_address: string;
};

export const tapesModel = createModel<RootModel>()({
	state: {
    assets: {
      cover: "",
      header: "",
      video: "",
    },
    contractAddress: "",
    current: {
      links: true,
      locked: true,
      mint: false,
      soldOut: false,
      submissions: true,
      tracks: false,
    },
    earlyBird: false,
    name: "",
    openseaLink: "",
    sample: {
      artist: "",
      bpm: "",
      description: "",
      header: "",
      image: "",
      sampleLink: "",
      twitterLink: "",
    },
    tracks:[{
      id: "",
      image: "",
      social_link: "",
      title: "",
      url: "",
      video_link: "",
      wallet_address: "",
    }],
  } as DocumentData,
	reducers: {
		setTapeData: (state, payload: DocumentData) => (payload || state),
	},
	effects: () => ({
		async getTapeData(tapeId: string) {
			const docRef = doc(db, "tapes", tapeId);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {        
				this.setTapeData(docSnap.data());
			}
		},
	})
});
