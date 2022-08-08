import { TapeStatus } from "../models/common";

const generateStatusLanguage = (status: number) => {
	if (+status >= TapeStatus?.MINT_CLOSE) return "closed";
	if (+status === TapeStatus?.MINT_OPEN) return "mint open";
	if (+status === TapeStatus?.VOTE_CLOSE) return "in curation";
	if (+status === TapeStatus?.VOTE_OPEN) return "voting open";
	if (+status === TapeStatus?.SUBMIT_CLOSE) return "submissions closed";
	if (+status === TapeStatus?.SUBMIT_OPEN) return "submissions open";
	if (+status === TapeStatus?.SAMPLE_OPEN) return "sample open";
	if (+status === TapeStatus?.SAMPLE_CLOSE) return "pending";
	if (+status === TapeStatus?.PENDING) return "pending";
};

export { generateStatusLanguage };
