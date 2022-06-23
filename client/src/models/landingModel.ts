import { createModel } from "@rematch/core";
import type { RootModel } from ".";
import { doc, DocumentData, getDoc } from "firebase/firestore";
import { db } from "../index";

export const landingModel = createModel<RootModel>()({
	state: {
		discord_link: "https://discord.com/invite/YPuAbCcDtg",
		header_video: "",
		title: "",
		title_link: "",
		twitter_link: "https://twitter.com/hedsDAO",
		spotlight: {
			tape_description: "",
			tape_header: "",
			tape_img: "",
			tape_link: ""
		}
	} as DocumentData,
	reducers: {
		setLandingData: (state, payload: DocumentData) => (payload || state)
	},
	effects: () => ({
		async getLandingData() {
			const docRef = doc(db, "landing", "v2");
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				// console.log(docSnap.data(), dispatch)
				this.setLandingData(docSnap.data());
				console.log(docSnap.data(), 'landing data')
			}
		}
	})
});
