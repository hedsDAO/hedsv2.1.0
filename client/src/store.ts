import { init, RematchDispatch, RematchRootState } from "@rematch/core";
import { models, RootModel } from "./models";

export const store = init({
	models,
	redux: {
		// devtoolOptions: {
		// 	disabled: true,
		// },
	},
});

export type Store = typeof store;
export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel>;
