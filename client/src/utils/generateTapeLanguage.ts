import { TapeStatus } from "../models/common";

const generateStatusColors = (status: string) => {
	if (+status >= TapeStatus?.MINT_CLOSE) return "#9f0000";
	if (+status === TapeStatus?.MINT_OPEN) return "green";
	if (+status === TapeStatus?.VOTE_CLOSE) return "golderod";
	if (+status === TapeStatus?.VOTE_OPEN) return "green";
	if (+status === TapeStatus?.SUBMIT_CLOSE) return "#9f0000";
	if (+status === TapeStatus?.SUBMIT_OPEN) return "green";
	if (+status === TapeStatus?.SAMPLE_OPEN) return "green";
	if (+status === TapeStatus?.SAMPLE_CLOSE) return "golderod";
	if (+status === TapeStatus?.PENDING) return "golderod";
};

export { generateStatusColors };
