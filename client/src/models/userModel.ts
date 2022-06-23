import { getSplitsUserBalance } from './../utils/graphql/getSplitsUserBalance';
import { createModel } from "@rematch/core";
import { collection, getDocs } from "firebase/firestore";
import type { RootModel } from ".";
import { UserFormattedOwnership } from "./common";
import { db } from "../index";
import { TapeTrack } from "./tapesModel";
import { ethers } from "ethers"

// WORK IN PROG

interface UserProfile {
	username?: string;
	// authData: {
	// 	moralisEth: {
	// 		id: "0xd1dad82179907cbebecc3a96c17f105d6329c039";
	// 		signature: "0x40fc03bd02518182072ae17b68dffa7c76683daf0284a700842087318d4ba5556995aaab01b8cc948825d517108867616ea0bcbf65531aa06f40497982f8d1b11b";
	// 		data: "Moralis Authentication\n\nId: KiB7e8lPCvDMU9VkOf2uM7d8Dt7DowQGR272Wkxd:1650651812709";
	// 	};
	// };
	createdAt?: string;
	updatedAt?: string;
	accounts?: Array<string>;
	ethAddress?: string;
	// ACL: {
	// 	bGWmaWmCG7ykIVCTnr63M3mr: {
	// 		read: true;
	// 		write: true;
	// 	};
	// };
	sessionToken?: string;
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
		setUserCollection: (state, userCollection:  Array<UserFormattedOwnership>) => ({...state, userCollection}),
		setUserProfile: (state, userProfile: UserProfile) => ({...state, userProfile}),
		setIsTapeArtist: (state, isTapeArtist: boolean) => ({...state, isTapeArtist}),
		setSplitsBalance: (state, splitsBalance: string) => ({...state, splitsBalance}),
	},
	effects: () => ({
		async loadUserProfile(user) {
			this.setUserProfile({
				bannerColors: user?.attributes?.bannerColors,
				currentBannerColor: user?.attributes?.currentBannerColor,
				userImages: user?.attributes?.userImages,
				currentUserImage: user?.attributes?.currentUserImage,
				userDisplayNames: user?.attributes?.userDisplayNames,
				currentDisplayName: user?.attributes?.currentDisplayName,
				ethAddress: user?.attributes?.ethAddress,
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
				};
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
	})
});
