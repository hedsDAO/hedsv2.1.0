import { BadgeData } from "../../models/common";

const emptyState: BadgeData = {
	name: "",
	description: "",
	image: "https://firebasestorage.googleapis.com/v0/b/heds-34ac0.appspot.com/o/public%2F2.png?alt=media&token=236158dd-d775-4f88-93aa-27045cd67792",
};

const badgeEmptyState = (badges: Array<BadgeData>): Array<BadgeData> => {
	const badgeLength: number = badges?.length;
	for (let i = badgeLength; i < 4; i++) {
		badges.push(emptyState);
	}
	return badges;
};

export { badgeEmptyState };
