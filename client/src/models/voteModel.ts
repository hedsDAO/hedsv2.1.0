import { createModel } from "@rematch/core";
import type { RootModel } from ".";
import { PublicSubmission } from "./common";
import { getProposalData } from "./../utils/graphql/getProposalData";
import { getVoteData } from "./../utils/graphql/getVoteData";
import { snapshotClient } from "./..";
import MoralisType from "moralis";

interface Favorites {
	count: number;
	favoritesList: Array<PublicSubmission>;
}


interface SnapshotData {
	proposalIndex: number;
	proposalData: any;
	voteData: Array<any>;
	didCastVote: Array<boolean>;
	voteCount: Array<number>;
	userVotes: Array<{ [key: string]: number }>;
}

interface VoteState {
	isLoading: boolean;
	selectedTrack: number;
	favorites: Favorites;
	snapshot: SnapshotData;
	votingPower: number;
}

export const voteModel = createModel<RootModel>()({
	state: {
		isLoading: false,
		selectedTrack: 0,
		favorites: {
			count: 0,
			favoritesList: [],
		},
		snapshot: {
			proposalIndex: 0,
			proposalData: [],
			voteData: [],
			didCastVote: [],
			voteCount: [],
			userVotes: [],
		},
		votingPower: 0,
	} as VoteState,
	reducers: {
		setSelectedTrack: (state, track: number) => {
			const newState = { ...state };
			newState.selectedTrack = track;
			return newState;
		},
		setIsLoading: (state, isLoading: boolean) => {
			const newState = { ...state };
			newState.isLoading = isLoading;
			return newState;
		},
		increaseFavorites: (state) => {
			const newState = { ...state };
			newState.favorites.count++;
			return newState;
		},
		decreaseFavorites: (state) => {
			const newState = { ...state };
			newState.favorites.count--;
			return newState;
		},
		addFavorite: (state, submission: PublicSubmission) => {
			const newState = { ...state };
			newState.favorites.favoritesList.push(submission);
			return newState;
		},
		removeFavorite: (state, submission: PublicSubmission) => {
			const newState = { ...state };
			const removeMe = newState.favorites.favoritesList.findIndex((sub) => sub.index === submission.index);
			newState.favorites.favoritesList.splice(removeMe, 1);
			return newState;
		},
		setFavoritesCount: (state, count: number) => {
			const newState = { ...state };
			newState.favorites.count = count;
			return newState;
		},
		setFavoritesList: (state, favoritesList: Array<PublicSubmission>) => {
			const newState = { ...state };
			newState.favorites.favoritesList = favoritesList;
			return newState;
		},
		setSnapshotSpaceData: (state, [voteData, proposalData]: any) => {
			const newState = { ...state };
			newState.snapshot.voteData = voteData;
			newState.snapshot.proposalData = proposalData[newState.snapshot.proposalIndex];
			return newState;
		},
		setDidCastVote: (state, [castVote, proposalIndex]: [boolean, number]) => {
			const newState = { ...state };
			newState.snapshot.didCastVote[proposalIndex] = castVote;
			return newState;
		},

		setVoteCount: (state, voteCount: number) => {
			const newState = { ...state };
			const index = newState.snapshot.proposalIndex;
			newState.snapshot.voteCount[index] = voteCount;
			return newState;
		},
		setUserVotes: (state, newVote: any) => {
			const newState = { ...state };
			const index = newState.snapshot.proposalIndex;
			newState.snapshot.userVotes[index] = newVote;
			return newState;
		},
	},
	effects: () => ({
		async loadSnapshotSpaceData() {
			const voteData = await getVoteData();
			const proposalData = await getProposalData();
			this.setSnapshotSpaceData([voteData.votes, proposalData.proposals]);
		},
		async castVote([web3, userVotes, walletId]: [MoralisType.MoralisWeb3Provider, any, string]) {
			this.setIsLoading(true);
			try {
				//@ts-ignore
				const receipt = await snapshotClient.vote(web3, walletId, {
					space: "camb0t.eth",
					proposal: "0xf9716a70e510aec8668633428c43e88e517634522445bff7596b0c9afec30e10",
					type: "quadratic",
					choice: userVotes,
					// @ts-ignore
					metadata: JSON.stringify({}),
				});
				await receipt;
				this.setDidCastVote([true, 0]);
				this.loadSnapshotSpaceData();
				this.setIsLoading(false);
			} catch (e) {
				this.setDidCastVote([false, 0]);
				this.setIsLoading(false);
			}
		},
	}),
});
