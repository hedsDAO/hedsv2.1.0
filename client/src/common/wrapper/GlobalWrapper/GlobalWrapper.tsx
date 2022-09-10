import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { Modals } from "../../../models/globalModel";
import ConnectModal from "../../modal/ConnectModal/ConnectModal";
import SettingsModal from "../../modal/SettingsModal/SettingsModal";
import TwitterModal from "../../modal/TwitterModal/TwitterModal";
import SubmissionModal from "../../modal/SubmissionModal/SubmissionsModal";
import MintModal from "../../modal/MintModal/MintModal";
import WarningModal from "../../modal/WarningModal/WarningModal";
import TokenBurnModal from "../../modal/TokenBurnModal/TokenBurnModal";
import VoteModal from "../../modal/VoteModal/VoteModal";
import PreMintModal from "../../modal/PreMintModal/PreMintModal";
import PublicMintModal from "../../modal/PublicMintModal/PublicMintModal";
import VinylFormModal from "../../modal/VinylFormModal/VinylFormModal";
const warningTitle = "Unverified Account";
const warningMessageTwitter = "Verify your account with twitter to continue.";
const warningMessageUser = "Connect your wallet to download the sample.";

const GlobalWrapper = ({ children }: { children: JSX.Element }) => {
	const userData = useSelector((state: RootState) => state.userModel);
	const globalData = useSelector((state: RootState) => state.globalModel);
	const modalTypes = {
		[Modals.CONNECT]: <ConnectModal />,
		[Modals.SETTINGS]: <SettingsModal />,
		[Modals.TWITTER]: <TwitterModal />,
		[Modals.VOTE]: userData?.twitterHandle ? <VoteModal /> : <WarningModal title={warningTitle} message={warningMessageTwitter} />,
		[Modals.SUBMIT]: userData?.twitterHandle ? (
			<SubmissionModal />
		) : (
			<WarningModal title={warningTitle} message={warningMessageTwitter} />
		),
		[Modals.PRE_MINT]: <PreMintModal />,
		[Modals.PUBLIC_MINT]: <PublicMintModal />,
		[Modals.MINT]: <MintModal />,
		[Modals.OGHED]: <TokenBurnModal />,
		[Modals.WARNING]: <WarningModal title={warningTitle} message={warningMessageUser} />,
		[Modals.VINYL_FORM] : <VinylFormModal />
	
	};

	return (
		<Fragment>
			{globalData.modal.open && globalData?.modal.modal !== Modals.EMPTY && (
				<Fragment>{modalTypes?.[globalData?.modal?.modal]}</Fragment>
			)}
			{children}
		</Fragment>
	);
};

export default GlobalWrapper;
