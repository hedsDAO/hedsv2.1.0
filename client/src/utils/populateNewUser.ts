import { BadgeData } from "../models/common";

const populateNewUser = () => {
	const vistorBadge: BadgeData = {
		description: "Welcome to heds.",
		image: "https://firebasestorage.googleapis.com/v0/b/heds-34ac0.appspot.com/o/heds%2Fprofile%2Fvisitor.png?alt=media&token=d01d7cbd-8d21-44ef-a6e2-2a284b54517a",
		name: "Vistor",
	};
	const newUserData = {
		profilePicture: "",
		twitterHandle: "",
		badges: [vistorBadge],
		description: "",
		votingPower: 0,
	};
	return newUserData;
};

export { populateNewUser };
