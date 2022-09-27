import { TapeStatus } from "../models/common";

const steps = [
	{
		name: "SUBMIT",
		icon: "fa-solid fa-upload",
		key: "1",
		description: "Submit your flip of the sample for a chance to be on the tape.",
		href: "#",
		status: "pending",
	},
	{
		name: "VOTE",
		icon: "fa-solid fa-box-ballot",
		key: "2",
		description: "Public submissions are posted anonymously and voted on by tape owners.",
		href: "#",
		status: "pending",
	},
	{
		name: "MINT",
		icon: "fa-solid fa-cassette-tape text-neutral-300 dark:text-neutral-850",
		key: "3",
		description: "Minting will be open for 24 hours.",
		href: "#",
		status: "pending",
	},
];

const calculateTapeStatus = (status: number) => {
	const updatedSteps = [...steps];
	if (status <= TapeStatus.SAMPLE_OPEN) {
		updatedSteps[0].status = "pending";
		updatedSteps[1].status = "pending";
		updatedSteps[2].status = "pending";
		return updatedSteps;
	}
	if (status === TapeStatus.SUBMIT_OPEN) {
		updatedSteps[0].status = "current";
		updatedSteps[1].status = "pending";
		updatedSteps[2].status = "pending";
		return updatedSteps;
	}
	if (status === TapeStatus.SUBMIT_CLOSE) {
		updatedSteps[0].status = "complete";
		updatedSteps[1].status = "pending";
		updatedSteps[2].status = "pending";
		return updatedSteps;
	}
	if (status === TapeStatus.VOTE_OPEN) {
		updatedSteps[0].status = "complete";
		updatedSteps[1].status = "current";
		updatedSteps[2].status = "pending";
		return updatedSteps;
	}
	if (status === TapeStatus.VOTE_CLOSE) {
		updatedSteps[0].status = "complete";
		updatedSteps[1].status = "complete";
		updatedSteps[2].status = "pending";
		return updatedSteps;
	}
	if (status === TapeStatus.MINT_OPEN) {
		updatedSteps[0].status = "complete";
		updatedSteps[1].status = "complete";
		updatedSteps[2].status = "current";
		updatedSteps[2].name = "MINT OPEN"
		return updatedSteps;
	}
	if (status === TapeStatus.MINT_CLOSE) {
		updatedSteps[0].status = "complete";
		updatedSteps[1].status = "complete";
		updatedSteps[2].status = "complete";
		return updatedSteps;
	}
	return steps;
};

export { calculateTapeStatus };
