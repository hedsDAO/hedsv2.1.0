import { Models } from "@rematch/core";
import { landingModel } from "./landingModel";
import { spaceModel } from "./spaceModel";
import { globalModel } from "./globalModel";
import { audioModel } from "./audioModel";
import { tapeModel } from "./tapeModel";
import { userModel } from "./userModel";

export interface RootModel extends Models<RootModel> {
	spaceModel: typeof spaceModel;
	globalModel: typeof globalModel;
	landingModel: typeof landingModel;
	audioModel: typeof audioModel;
	tapeModel: typeof tapeModel;
	userModel: typeof userModel;
}

export const models: RootModel = { spaceModel, landingModel, globalModel, audioModel, tapeModel, userModel };
