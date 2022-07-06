const hedsTAPE01 = "0xDE8a0b17D3Dc0468AdC65309881D9d6A6Cd66372";
const hedsTAPE02 = "0x5083cF11003f2B25Ca7456717e6dC980545002e5";
const hedsTAPE03 = "0x567e687C93103010962F9E9Cf5730Ae8DBFC6d41";
const hedsTAPE04 = "0x8045fd700946A00436923f37d08f280ADe3b4af6";
const hedsTAPE05 = "0x8f36eB094F7B960a234a482d4d8FFb8b37f728C6";
const HT1_img =
	"https://firebasestorage.googleapis.com/v0/b/heds-34ac0.appspot.com/o/tapes%2F1%2Fassets%2Fimg_cover.png?alt=media&token=bf42c72d-4999-452b-932a-2d500a9e45d1";
const HT2_img =
	"https://firebasestorage.googleapis.com/v0/b/heds-34ac0.appspot.com/o/tapes%2F2%2Fassets%2Fimg_cover.png?alt=media&token=74108fde-b3c6-4a8b-87fc-9a7c47c1d8c6";
const HT3_img =
	"https://firebasestorage.googleapis.com/v0/b/heds-34ac0.appspot.com/o/tapes%2F3%2Fassets%2Fimg_cover.png?alt=media&token=8ae97e34-1ac6-4cff-9ed9-59bba9f67752";
const HT4_img =
	"https://firebasestorage.googleapis.com/v0/b/heds-34ac0.appspot.com/o/tapes%2F4%2Fsample%2Fcover.png?alt=media&token=12472a00-1744-42d3-a447-8a8a66a4bbe3";
const HT5_img =
	"https://firebasestorage.googleapis.com/v0/b/heds-34ac0.appspot.com/o/public%2Fcovers%2FHT5_COVER.png?alt=media&token=33463281-549c-4a3a-b10c-7a94fd3c2971";

const empty =
	"https://firebasestorage.googleapis.com/v0/b/heds-34ac0.appspot.com/o/public%2F2.png?alt=media&token=236158dd-d775-4f88-93aa-27045cd67792";

export interface UserFormattedOwnership {
	name: string;
	quantity: number;
	token_ids: Array<string>;
	src: string;
	href: string;
}

export interface UserNFTBalance {
	status?: string | undefined;
	total?: number | undefined;
	page?: number | undefined;
	page_size?: number | undefined;
	result?:
		| {
				token_address: string;
				token_id: string;
				contract_type: string;
				owner_of: string;
				block_number: string;
				block_number_minted: string;
				token_uri?: string | undefined;
				metadata?: string | undefined;
				synced_at?: string | undefined;
				amount?: string | undefined;
				name: string;
				symbol: string;
		  }[]
		| undefined;
}

const parseUserCollection = (balance: UserNFTBalance): Array<UserFormattedOwnership> => {
	const ownership: Array<UserFormattedOwnership> = [
		{ name: "hedsTAPE 01", quantity: 0, token_ids: [], src: HT1_img, href: "/listen/hedstape/1" },
		{ name: "hedsTAPE 02", quantity: 0, token_ids: [], src: HT2_img, href: "/listen/hedstape/2" },
		{ name: "hedsTAPE 03", quantity: 0, token_ids: [], src: HT3_img, href: "/listen/hedstape/3" },
		{ name: "hedsTAPE 04", quantity: 0, token_ids: [], src: HT4_img, href: "/listen/hedstape/4" },
		{ name: "hedsTAPE 05", quantity: 0, token_ids: [], src: HT5_img, href: "/listen/hedstape/5" },
		{ name: "", quantity: 1, token_ids: [], src: empty, href: "" },
		{ name: "", quantity: 1, token_ids: [], src: empty, href: "" },
		{ name: "", quantity: 1, token_ids: [], src: empty, href: "" },
		{ name: "", quantity: 1, token_ids: [], src: empty, href: "" },
		{ name: "", quantity: 1, token_ids: [], src: empty, href: "" },
		{ name: "", quantity: 1, token_ids: [], src: empty, href: "" },
	];
	balance?.result?.map((token) => {
		if (token.token_address.toLowerCase() === hedsTAPE01.toLowerCase()) {
			ownership[0].quantity++;
			ownership[0].token_ids.unshift(token.token_id);
		} else if (token.token_address.toLowerCase() === hedsTAPE02.toLowerCase()) {
			ownership[1].quantity++;
			ownership[1].token_ids.unshift(token.token_id);
		} else if (token.token_address.toLowerCase() === hedsTAPE03.toLowerCase()) {
			ownership[2].quantity++;
			ownership[2].token_ids.unshift(token.token_id);
		} else if (token.token_address.toLowerCase() === hedsTAPE04.toLowerCase()) {
			ownership[3].quantity++;
			ownership[3].token_ids.unshift(token.token_id);
		} else if (token.token_address.toLowerCase() === hedsTAPE05.toLowerCase()) {
			ownership[4].quantity++;
			ownership[4].token_ids.unshift(token.token_id);
		}
	});
	return ownership;
};
export default parseUserCollection;
