import { createModel } from "@rematch/core";
import type { RootModel } from ".";

export interface GlobalState {}

export const globalModel = createModel<RootModel>()({
	state: {

	} as GlobalState,
	reducers: {
		setGlobalData: (state, payload: GlobalState) => payload || state,
	},
	effects: () => ({
		async getGlobalData() {},
	}),
});
