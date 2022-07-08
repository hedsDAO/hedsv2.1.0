import { createModel } from "@rematch/core";
import type { RootModel } from ".";
import { UserFormattedOwnership } from "./common";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../index";

interface UserState {
	profilePicture: string;
	twitterHandle: string;
	badges: string;
	description: string;
}

export const userModel = createModel<RootModel>()({
	state: {} as UserState,
	reducers: {
		setUserCollection: (state, userCollection: Array<UserFormattedOwnership>) => ({ ...state, userCollection }),
		setUserData: (state, payload: UserState) => ({ ...state, ...payload }),
	},
	effects: () => ({
		async getUserData({ wallet }) {
			const docRef = doc(db, "user", wallet);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				this.setUserData(docSnap.data());
			}
		},
	}),
});
