import { DocumentData } from "firebase/firestore";
import Moralis from "moralis/types";
import { TokenMapping } from "../data/whitelist";
import { TapeData } from "./globalTapesModel";

export interface UserFormattedOwnership {
	name: string;
	quantity: number;
	token_ids: Array<string>;
	src: string;
	href: string;
}

export interface UserSubmission {
	id: string;
	subId: string;
	link: string;
	index?: number;
}

export interface PublicSubmission {
	id: string;
	subId: string;
	link: string;
	index: number;
}

export interface TapeTrack {
	id: string;
	image: string;
	social_link: string;
	title: string;
	url: string;
	video_link: string;
	wallet_address: string;
}

export interface PlaylistProps {
	tapeData: Array<TapeTrack>;
	selectedTrack: string;
	setSelectedTrack: Function;
}

export interface ModalProps {
	isShowingModal: boolean;
	setIsShowingModal: Function;
}

export interface ConnectModalProps {
	isShowingConnectModal: boolean;
	setIsShowingConnectModal: Function;
}

export interface MintModalProps {
	isShowingMintModal: boolean;
	setIsShowingMintModal: Function;
	tapeNum: string;
}

export interface ProfileModalProps {
	user: Moralis.User<Moralis.Attributes>;
	isShowingProfileModal: boolean;
	setIsShowingProfileModal: Function;
}

export interface SampleModalProps {
	tapeNum: string;
	bpm: string;
	status: string;
	isShowingSampleModal: boolean;
	setIsShowingSampleModal: Function;
}

export interface SnapshotModalProps {
	isShowingSnapshotModal: boolean;
	setIsShowingSnapshotModal: Function;
}

export interface SubmissionModalProps {
	tapeDbId: string;
	isShowingSubmissionsModal: boolean;
	setIsShowingSubmissionsModal: Function;
}

export interface TokenBurnModalProps {
	user: Moralis.User<Moralis.Attributes> | null;
	tokenMapping: TokenMapping;
	tapeDbId?: string;
	isShowingTokenBurnModal: boolean;
	setIsShowingTokenBurnModal: Function;
}

export interface TwitterModalProps {
	user: Moralis.User<Moralis.Attributes>;
	isShowingTwitterModal: boolean;
	setIsShowingTwitterModal: Function;
}

export interface TwitterWarningModalProps {
	isShowingTwitterWarningModal: boolean;
	setIsShowingTwitterWarningModal: Function;
}

export interface SubmissionsPlayerProps {
	tracks?: Array<UserSubmission>;
	walletId: string;
}

export interface CountdownProps {
	deadline: string;
}

export interface TapeStatusBadgeProps {
	status: number;
	link: string;
}

export interface TapeStatusStyles {
	mint: string;
	vote: string;
	curation: string;
	sample: string;
	sampleClose: string;
	submit: string;
	sold_out: string;
}

export interface TapeContainerProps {
	tapeNum: number;
	tracksData?: DocumentData;
	tracks?: boolean;
}

export interface TimelineIconProps {
	active: boolean;
	completed: boolean;
	globalTapeData?: TapeData;
}

export interface TimelineProps {
	tapeData: DocumentData;
	globalTapeData: TapeData;
}

export interface AudioPlayerProps {
	tracks: Array<UserSubmission>;
	selectedTrack: number;
}

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