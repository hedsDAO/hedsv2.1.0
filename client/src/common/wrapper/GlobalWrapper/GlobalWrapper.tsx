import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { Modals } from "../../../models/globalModel";
import ConnectModal from "../../modal/ConnectModal/ConnectModal";
import SettingsModal from "../../modal/SettingsModal/SettingsModal";
import TwitterModal from "../../modal/TwitterModal/TwitterModal";

const GlobalWrapper = ({ children }: { children: JSX.Element }) => {
	const globalData = useSelector((state: RootState) => state.globalModel);

	const modalTypes = {
		[Modals.CONNECT]: <ConnectModal />,
		[Modals.SETTINGS]: <SettingsModal />,
		[Modals.TWITTER]: <TwitterModal />,
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
