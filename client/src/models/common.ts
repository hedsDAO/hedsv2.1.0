export enum TapeStatus {
	PENDING = 0,
	SAMPLE_CLOSE,
	SAMPLE_OPEN,
	SUBMIT_OPEN,
	SUBMIT_CLOSE,
	VOTE_OPEN,
	VOTE_CLOSE,
	MINT_OPEN,
	MINT_CLOSE,
}

export enum PreMintStatus {
	PENDING = 0,
	PRE_MINT_OPEN,
	PRE_MINT_CLOSED, 
	PUBLIC_MINT_OPEN, 
	PUBLIC_MINT_CLOSED
}

export enum PlayerSize {
	HIDDEN = 0,
	SMALL,
	MINIMIZED
}

export interface TrackMetadata {
	no: string;
	audio: string;
	video: string;
	artist: string;
	profilePicture: string;
	wallet: string;
	social: string;
	title?:string;
	duration: number;
}

export interface SampleData {
	artist: string;
	audio: string;
	video: string;
	bpm: string;
	image: string;
	wallet: string;
}

export interface UserFormattedOwnership {
	name: string;
	quantity: number;
	token_ids: Array<string>;
	src: string;
	href: string;
}

export interface BadgeData {
	name: string;
	description: string;
	image: string;
}

export interface CollectionItem {
	name: string;
	token_address: string;
	token_uri: string;
	quantity: number;
	metadata: string;
}
export interface CollectionTank {
	[address: string]: CollectionItem;
}

export interface UserSubmission {
	id: string;
	subId: string;
	link: string;
	index?: number;
	walletId?: string;
}

export interface PublicSubmission {
	id: string;
	subId: string;
	link: string;
	index: number;
}

export interface SubmissionsPlayerProps {
	tracks?: Array<UserSubmission>;
	walletId: string;
}

export interface AudioPlayerProps {
	tracks: Array<UserSubmission>;
	selectedTrack: number;
}
