import { createModel } from "@rematch/core";
import type { RootModel } from ".";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../index";
import { BadgeData, CollectionTank, TrackMetadata } from "./common";
import { populateNewUser } from "../utils/populateNewUser";
import { whitelist } from "../data/whitelists/tokenBurnWhitelist";
import { getSplitsUserBalance } from "../utils/graphql/getSplitsUserBalance";
import { ethers } from "ethers"


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
	splitsBalance?: string;
	isTapeArtist?: boolean;
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
		setSplitsBalance: (state, splitsBalance: string) => ({ ...state, splitsBalance }),
		setIsTapeArtist: (state, isTapeArtist: boolean) => ({...state, isTapeArtist}),
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
		async getTapeArtistsWalletIds(wallet: string) {
			const docRef = doc(db, "audio", 'heds');
			const docSnap = await getDoc(docRef);
			const walletIdTank: Array<string> = [];
			if (docSnap.exists()) {
				Object.values(docSnap.data().hedstape).map((tape: any) => {
					const walletIds: Array<string> = tape.map((track: any) => track.wallet.toLowerCase());
					if (walletIds) return walletIdTank.push(...walletIds);
				})
				const noDuplicateWalletIds = new Set(walletIdTank);
				if (noDuplicateWalletIds.has(wallet)) {
					this.setIsTapeArtist(true);
					this.getSplitsBalance(wallet);
				} else this.setIsTapeArtist(false);
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
				const newSpaceData = { ...audioSnap.data() };
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
		async getSplitsBalance(walletId: string) {
			const balance = await getSplitsUserBalance(walletId);
			const tokenId = balance.user.internalBalances[0].token.id;
			const amount = balance.user.internalBalances[0].amount;
			if (tokenId === "0x0000000000000000000000000000000000000000" && amount > 0) {
				this.setSplitsBalance(ethers.utils.formatEther(amount));
				return;
			}
			return;
		},
	}),
});
