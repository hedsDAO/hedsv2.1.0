import { Models } from "@rematch/core";
import { landingModel } from "./landingModel";
import { spaceModel } from "./spaceModel";
import { globalModel } from "./globalModel";
import { audioModel } from "./audioModel";
import { tapeModel } from "./tapeModel";
import { userModel } from "./userModel";
import { exploreModel } from "./exploreModel";
import { openSeaModel } from "./openSeaModel";
import { submissionsModel } from "./submissionsModel";

export interface RootModel extends Models<RootModel> {
	spaceModel: typeof spaceModel;
	globalModel: typeof globalModel;
	landingModel: typeof landingModel;
	audioModel: typeof audioModel;
	tapeModel: typeof tapeModel;
	userModel: typeof userModel;
	exploreModel: typeof exploreModel;
	openSeaModel: typeof openSeaModel;
	submissionsModel: typeof submissionsModel;
}

export const models: RootModel = {
	spaceModel,
	landingModel,
	globalModel,
	audioModel,
	tapeModel,
	userModel,
	exploreModel,
	openSeaModel,
	submissionsModel,
};
