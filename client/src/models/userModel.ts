import { getSplitsUserBalance } from "./../utils/graphql/getSplitsUserBalance";
import { createModel } from "@rematch/core";
import { collection, getDocs } from "firebase/firestore";
import type { RootModel } from ".";
import { UserFormattedOwnership } from "./common";
import { db } from "../index";
import { ethers } from "ethers";

export interface TapeTrack {
	id: string;
	image: string;
	social_link: string;
	title: string;
	url: string;
	video_link: string;
	wallet_address: string;
}
interface UserProfile {
	ethAddress: string;
	twitterHandle: string;
	profilePicture: string;
	currentUserImage: number;
	userImages: Array<string>;
	currentBannerColor: number;
	bannerColors: Array<string>;
	userDisplayNames: Array<string>;
	currentDisplayName: number;
}

export interface UserState {
	userProfile: UserProfile;
	userCollection?: Array<UserFormattedOwnership>;
	isTapeArtist: boolean;
	splitsBalance?: string;
}

export const userModel = createModel<RootModel>()({
	state: {
		isTapeArtist: false,
	} as UserState,
	reducers: {
		setUserCollection: (state, userCollection: Array<UserFormattedOwnership>) => ({ ...state, userCollection }),
		setUserProfile: (state, userProfile: UserProfile) => ({ ...state, userProfile }),
		setIsTapeArtist: (state, isTapeArtist: boolean) => ({ ...state, isTapeArtist }),
		setSplitsBalance: (state, splitsBalance: string) => ({ ...state, splitsBalance }),
	},
	effects: () => ({
		async loadUserProfile(user) {
			this.setUserProfile({
				profilePicture: user?.attributes?.profilePicture,
				ethAddress: user?.attributes?.ethAddress,
				twitterHandle: user?.attributes?.twitterHandle,
			});
		},
		async getTapeArtistsWalletIds(walletId: string) {
			const querySnapshot = await getDocs(collection(db, "tapes"));
			const walletIdTank: Array<string> = [];
			querySnapshot.forEach((doc) => {
				const walletIds: Array<string> = doc.data()?.tracks?.map((track: TapeTrack) => {
					return track?.wallet_address;
				});
				if (walletIds) return walletIdTank.push(...walletIds);
				return;
			});
			const noDuplicateWalletIds = new Set(walletIdTank);
			if (noDuplicateWalletIds.has(walletId)) {
				this.setIsTapeArtist(true);
				this.getSplitsBalance(walletId);
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
