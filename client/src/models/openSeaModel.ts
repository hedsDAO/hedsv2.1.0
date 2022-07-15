import { createModel } from "@rematch/core";
import type { RootModel } from ".";
import { calculateTapeVP } from "../utils/calcluateTapeVp";
import axios from "axios";

interface OpenSeaState {
	numOfOwners: number;
	calculatedVP: number;
	totalVolume: number;
	minted: number;
}

export const openSeaModel = createModel<RootModel>()({
	state: {
		calculatedVP: 0,
		numOfOwners: 0,
		totalVolume: 0,
		minted: 0,
	} as OpenSeaState,
	reducers: {
		setTapeVotingPower: (state, calculatedVP: number) => ({ ...state, calculatedVP }),
		setNumOfOwners: (state, numOfOwners: number) => ({ ...state, numOfOwners }),
		setTotalVolume: (state, totalVolume: number) => ({ ...state, totalVolume }),
		setMinted: (state, minted: number) => ({ ...state, minted }),
	},
	effects: () => ({
		async getCollectionData(collection: string) {
			const headers = { Accept: "application/json", "X-API-KEY": "96f93b237cd14aafbda92f6d5cbf49ca" };
			await axios.get(`https://api.opensea.io/api/v1/collection/${collection}/stats`, { headers }).then((res) => {
				const stats = res.data.stats;
				console.log(stats);
				this.setTapeVotingPower(calculateTapeVP([stats?.num_owners, stats?.count]));
				this.setNumOfOwners(stats.num_owners);
				this.setTotalVolume(stats.total_volume);
				this.setMinted(stats.total_supply);
			});
		},
	}),
});
