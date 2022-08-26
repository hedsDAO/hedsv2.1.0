import { TapeStatus } from "../models/common";
import { PreMintStatus } from "../models/common";

const generateStatusColors = (status: number) => {
	if (+status >= TapeStatus?.MINT_CLOSE) return "#FF3333";
	if (+status === TapeStatus?.MINT_OPEN) return "green";
	if (+status === TapeStatus?.VOTE_CLOSE) return "golderod";
	if (+status === TapeStatus?.VOTE_OPEN) return "green";
	if (+status === TapeStatus?.SUBMIT_CLOSE) return "#FF3333";
	if (+status === TapeStatus?.SUBMIT_OPEN) return "green";
	if (+status === TapeStatus?.SAMPLE_OPEN) return "green";
	if (+status === TapeStatus?.SAMPLE_CLOSE) return "golderod";
	if (+status === TapeStatus?.PENDING) return "golderod";
};

const generateCollabStatusColors = (status: number) => {
	if (+status >= PreMintStatus?.PRE_MINT_CLOSED) return "goldenrod";
	if (+status === PreMintStatus?.PRE_MINT_OPEN) return "green";
	if (+status === PreMintStatus?.PUBLIC_MINT_OPEN) return "green";
	if (+status === PreMintStatus?.PUBLIC_MINT_CLOSED) return "red";
};

export { generateStatusColors, generateCollabStatusColors };
