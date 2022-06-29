import { TapeStatus } from "../models/common";

const steps = [

	{
		name: "SUBMIT",
        icon: 'fa-solid fa-upload',
		key: "1",
		description: "Submit your flip of the sample for a chance to be on the tape.",
		href: "#",
		status: "upcoming",
	},
	{
		name: "VOTE",
        icon: 'fa-solid fa-box-ballot',
		key: "2",
		description: "Public submissions are posted anonymously and voted on by tape owners.",
		href: "#",
		status: "upcoming",
	},
	{
		name: "MINT",
        icon: 'fa-solid fa-cassette-tape',
		key: "3",
		description: "The collection has been released. Minting will be open for 24 hours.",
		href: "#",
		status: "upcoming",
	},
];

const calculateTimelineStatus = (status: number) => {
	const updatedSteps = [ ...steps ];
	if (status < TapeStatus.SUBMIT_CLOSE) {
		updatedSteps[0].status = "current";
		updatedSteps[1].status = "pending";
		updatedSteps[2].status = "pending";
		return updatedSteps;
	}
	if (status > TapeStatus.SUBMIT_CLOSE && status < TapeStatus.VOTE_CLOSE) {
		updatedSteps[0].status = "complete";
		updatedSteps[1].status = "current";
		updatedSteps[2].status = "pending";
		return updatedSteps;
	}
	if (status > TapeStatus.VOTE_CLOSE && status < TapeStatus.MINT_CLOSE) {
		updatedSteps[0].status = "complete";
		updatedSteps[1].status = "complete";
		updatedSteps[2].status = "current";
		return updatedSteps;
	}
	if (status >= TapeStatus.MINT_CLOSE) {
		updatedSteps[0].status = "complete";
		updatedSteps[1].status = "complete";
		updatedSteps[2].status = "complete";
		return updatedSteps;
	}
	return steps;
};

export { calculateTimelineStatus };
