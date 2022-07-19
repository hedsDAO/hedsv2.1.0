import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { Modals } from "../../../models/globalModel";
import ConnectModal from "../../modal/ConnectModal/ConnectModal";
import SettingsModal from "../../modal/SettingsModal/SettingsModal";
import TwitterModal from "../../modal/TwitterModal/TwitterModal";
import SubmissionModal from "../../modal/SubmissionModal/SubmissionsModal";
import MintModal from "../../modal/MintModal/MintModal";
import TokenBurnModal from "../../modal/TokenBurnModal/TokenBurnModal";
import VoteModal from "../../modal/VoteModal/VoteModal";

const GlobalWrapper = ({ children }: { children: JSX.Element }) => {
	const globalData = useSelector((state: RootState) => state.globalModel);
	const modalTypes = {
		[Modals.CONNECT]: <ConnectModal />,
		[Modals.SETTINGS]: <SettingsModal />,
		[Modals.TWITTER]: <TwitterModal />,
		[Modals.VOTE]: <VoteModal />,
		[Modals.SUBMIT]: <SubmissionModal />,
		[Modals.MINT]: <MintModal />,
		[Modals.OGHED]: <TokenBurnModal />,
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
