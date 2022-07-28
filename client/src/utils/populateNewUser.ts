import { BadgeData } from "../models/common";

const populateNewUser = (wallet: string) => {
	const vistorBadge: BadgeData = {
		description: "Welcome to heds.",
		image: "https://firebasestorage.googleapis.com/v0/b/heds-34ac0.appspot.com/o/badges%2Fvisitor.png?alt=media&token=468508bd-2831-4bd2-b943-329e5608cad1",
		name: "Visitor",
	};
	const newUserData = {
		profilePicture: "https://firebasestorage.googleapis.com/v0/b/heds-34ac0.appspot.com/o/users%2F0x000000000000000000000000000000.png?alt=media&token=55cb53fe-736d-4b1e-bcd0-bf17bc7146dc",
		twitterHandle: "",
		badges: [vistorBadge],
		description: "",
		votingPower: 0,
		wallet: wallet.toLowerCase()
	};
	return newUserData;
};

export { populateNewUser };
