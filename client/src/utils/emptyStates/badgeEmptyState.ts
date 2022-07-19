import { BadgeData } from "../../models/common";

const emptyState: BadgeData = {
	name: "",
	description: "",
	image: "",
};

const badgeEmptyState = (badges: Array<BadgeData>): Array<BadgeData> => {
	const badgeLength: number = badges?.length;
	for (let i = badgeLength; i < 4; i++) {
		badges.push(emptyState);
	}
	return badges;
};

export { badgeEmptyState };
