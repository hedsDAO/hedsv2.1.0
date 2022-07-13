import { createModel } from "@rematch/core";
import type { RootModel } from ".";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../index";
import { BadgeData, CollectionTank } from "./common";
import { populateNewUser } from "../utils/populateNewUser";

export interface UserState {
	profilePicture?: string;
	twitterHandle?: string;
	badges?: Array<BadgeData>;
	description: string;
	collection: CollectionTank;
	votingPower: number;
}

export const userModel = createModel<RootModel>()({
	state: {
		votingPower: 0,
		description: "",
		collection: {},
	} as UserState,
	reducers: {
		setCollection: (state, collection: CollectionTank) => ({ ...state, collection }),
		setUserData: (state, payload: UserState) => ({ ...state, ...payload }),
		clearUserData: (state) => {
			let newState = { ...state };
			newState = { votingPower: 0, description: "", collection: {} };
			return newState;
		},
	},
	effects: () => ({
		async getUserData(wallet: string) {
			const docRef = doc(db, "user", wallet);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) this.setUserData(docSnap.data());
		},
		async validateNewUser(wallet: string) {
			const docRef = doc(db, "user", wallet);
			const docSnap = await getDoc(docRef);
			const newUserData = populateNewUser();
			if (!docSnap.exists()) await setDoc(docRef, newUserData).then(() => this.setUserData(newUserData));
		},
		async updateProfilePicture([wallet, profilePicture]: [string, string]) {
			const docRef = doc(db, "user", wallet);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				const updatedUserData = { ...docSnap.data(), profilePicture };
				await updateDoc(docRef, updatedUserData).then(() => this.setUserData(updatedUserData));
			}
		},
		async updateDescription([wallet, description]: [string, string]) {
			const docRef = doc(db, "user", wallet);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				const updatedUserData = { ...docSnap.data(), description };
				await updateDoc(docRef, updatedUserData).then(() => this.setUserData(updatedUserData));
			}
		},
		async updateTwitterHandle([wallet, twitterHandle]: [string, string]) {
			const docRef = doc(db, "user", wallet);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				const updatedUserData = { ...docSnap.data(), twitterHandle };
				await updateDoc(docRef, updatedUserData).then(() => this.setUserData(updatedUserData));
			}
		},
	}),
});
