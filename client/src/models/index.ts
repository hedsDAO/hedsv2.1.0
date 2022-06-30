import { Models } from "@rematch/core";
import { landingModel } from "./landingModel";

export interface RootModel extends Models<RootModel> {
	landingModel: typeof landingModel;
}

export const models: RootModel = { landingModel };
