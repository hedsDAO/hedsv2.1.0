import { voteModel } from './voteModel';
import { landingModel } from "./landingModel";
import { submissionsModel } from "./submissionsModel";
import { tapesModel } from "./tapesModel";
import { userModel } from "./userModel";
import { globalModel } from "./globalModel";
import { globalTapesModel } from "./globalTapesModel";
import { Models } from "@rematch/core";

export interface RootModel extends Models<RootModel> {
	landingModel: typeof landingModel;
	submissionsModel: typeof submissionsModel;
	tapesModel: typeof tapesModel;
	userModel: typeof userModel;
	globalModel: typeof globalModel;
	globalTapesModel: typeof globalTapesModel;
	voteModel: typeof voteModel;
}

export const models: RootModel = { landingModel, submissionsModel, tapesModel, userModel, globalModel, globalTapesModel, voteModel };
