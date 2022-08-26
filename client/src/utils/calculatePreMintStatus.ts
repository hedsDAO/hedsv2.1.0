import { PreMintStatus } from "../models/common";

const steps = [
	{
		name: "HEDS MINT",
		icon: "fa-duotone fa-cassette-tape text-neutral-300 dark:text-neutral-850",
		key: "1",
		description: "Whitelisted mint for hedsTAPE owners.",
		href: "#",
		status: "pending",
	},
	{
		name: "PUBLIC MINT",
		icon: "fa-solid fa-cassette-tape text-neutral-300 dark:text-neutral-850",
		key: "2",
		description: "Public mint will be available for any tapes not sold during the heds mint.",
		href: "#",
		status: "pending",
	},
];

const calculatePreMintStatus = (status: number) => {
	const updatedSteps = [...steps];
	if (status <= PreMintStatus.PENDING) {
		updatedSteps[0].status = "pending";
        updatedSteps[0].icon = "fa-solid fa-lock text-neutral-300 dark:text-neutral-850";
		updatedSteps[1].status = "pending";
        updatedSteps[1].icon = "fa-solid fa-lock text-neutral-300 dark:text-neutral-850";

		return updatedSteps;
	}
	if (status === PreMintStatus.PRE_MINT_OPEN) {
		updatedSteps[0].status = "current";
		updatedSteps[1].status = "pending";
        updatedSteps[1].icon = "fa-solid fa-lock text-neutral-300 dark:text-neutral-850";
		return updatedSteps;
	}
	if (status === PreMintStatus.PRE_MINT_CLOSED) {
		updatedSteps[0].status = "complete";
        updatedSteps[0].icon = "fa-solid fa-check-circle text-neutral-300 dark:text-neutral-850";
		updatedSteps[1].status = "pending";
        updatedSteps[1].icon = "fa-solid fa-lock text-neutral-300 dark:text-neutral-850";

		return updatedSteps;
	}
	if (status === PreMintStatus.PUBLIC_MINT_OPEN) {
		updatedSteps[0].status = "complete";
		updatedSteps[1].status = "current";
		return updatedSteps;
	}
	if (status === PreMintStatus.PUBLIC_MINT_CLOSED) {
		updatedSteps[0].status = "complete";
		updatedSteps[1].status = "complete";

		return updatedSteps;
	}
	return steps;
};

export { calculatePreMintStatus };
