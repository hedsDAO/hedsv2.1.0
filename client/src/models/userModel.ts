import { createModel } from "@rematch/core";
import type { RootModel } from ".";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../index";
import { BadgeData, CollectionTank, TrackMetadata } from "./common";
import { populateNewUser } from "../utils/populateNewUser";
import { whitelist } from "../data/whitelists/tokenBurnWhitelist";

interface SetVotingPower {
	walletId: string | any;
	collection?: CollectionTank;
	powerMapping: Array<number>;
}

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
		setVotingPower: (state, userData: SetVotingPower) => {
			const newState = { ...state };
			newState.votingPower = 0;
			const { collection, walletId, powerMapping } = userData;
			if (!collection || Object.values(collection).length === 0) return newState;
			else {
				if (whitelist.includes(walletId)) newState.votingPower += 10;
				Object.values(collection).map((tape, idx) => {
					newState.votingPower += tape.quantity * powerMapping[idx];
				});
				return newState;
			}
		},
		setUserData: (state, payload: UserState) => ({ ...state, ...payload }),
		clearUserData: (state) => {
			let newState = { ...state };
			newState = { votingPower: 0, description: "", collection: {}, twitterHandle: "", profilePicture: "" };
			return newState;
		},
	},
	effects: () => ({
		async getUserData(wallet: string) {
			const docRef = doc(db, "users", wallet);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				this.setUserData(docSnap.data());
			} else {
				const newUserData = populateNewUser(wallet);
				await setDoc(docRef, newUserData).then(() => {
					this.setUserData(newUserData);
				})
			}
		},
		async updateProfilePicture([wallet, profilePicture]: [string, string]) {
			const docRef = doc(db, "users", wallet);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				const updatedUserData = { ...docSnap.data(), profilePicture };
				await updateDoc(docRef, updatedUserData).then(() => this.setUserData(updatedUserData));
			}
			const audioRef = doc(db, "audio", "heds");
			const audioSnap = await getDoc(audioRef);
			if (audioSnap.exists()) {
				const newSpaceData = {...audioSnap.data()};
				const { hedstape } = newSpaceData;
				Object.keys(hedstape).map((tapeNum) => {
					hedstape[tapeNum].map((track: TrackMetadata) => {
						if (track?.wallet.toLowerCase() === wallet.toLowerCase()) {
							track.profilePicture = profilePicture;
						}
					})
				})
				if (newSpaceData !== audioSnap.data()) await setDoc(audioRef, newSpaceData);
			}
		},
		async updateDescription([wallet, description]: [string, string]) {
			const docRef = doc(db, "users", wallet);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				const updatedUserData = { ...docSnap.data(), description };
				await updateDoc(docRef, updatedUserData).then(() => this.setUserData(updatedUserData));
			}
		},
		async updateTwitterHandle([wallet, twitterHandle]: [string, string]) {
			const docRef = doc(db, "users", wallet);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				const updatedUserData = { ...docSnap.data(), twitterHandle };
				await updateDoc(docRef, updatedUserData).then(() => this.setUserData(updatedUserData));
			}
		},
	}),
});
