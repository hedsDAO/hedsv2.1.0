import React, { useState } from "react";
import { useParams } from "react-router";
import { useMoralis } from "react-moralis";
import { TimelineIconProps } from "../../../models/common";
import SubmissionModal from "../../../common/modals/SubmissionModal/SubmissionModal";
import ConnectModal from "../../../common/modals/ConnectModal/ConnectModal";
import TwitterWarningModal from "../../../common/modals/TwitterWarningModal/TwitterWarningModal";

const Submit = ({ completed, active }: TimelineIconProps) => {
	const [isShowingSubmissionsModal, setIsShowingSubmissionsModal] = useState(false);
	const [isShowingTwitterWarningModal, setIsShowingTwitterWarningModal] = useState(false);
	const [isShowingConnectModal, setIsShowingConnectModal] = useState(false);
	const { id } = useParams<{ id: string }>();
	const { user } = useMoralis();
	const handleModalOpen = () => {
		if (!user) setIsShowingConnectModal(true);
		else if (!user?.attributes?.twitterHandle) {
			setIsShowingTwitterWarningModal(true);
		} else setIsShowingSubmissionsModal(true);
	};
	return (
		<>
			{active && <i className={"fa-light fa-check text-sm mb-1 text-amber-500"} />}
			{completed && <i className={"fa-light fa-check text-sm text-green-500 mb-1"}></i>}
			<TwitterWarningModal
				isShowingTwitterWarningModal={isShowingTwitterWarningModal}
				setIsShowingTwitterWarningModal={setIsShowingTwitterWarningModal}
			/>
			<ConnectModal isShowingConnectModal={isShowingConnectModal} setIsShowingConnectModal={setIsShowingConnectModal} />
			<SubmissionModal
				isShowingSubmissionsModal={isShowingSubmissionsModal}
				setIsShowingSubmissionsModal={setIsShowingSubmissionsModal}
				tapeDbId={id}
			/>
			<button disabled={!active} onClick={active ? () => handleModalOpen() : () => {}} className="group text-left my-2">
				<span className={"flex items-start text-sm font-medium"}>
					<span className="flex-shrink-0">
						<span
							className="md:w-12 md:h-12 w-10 h-10  border flex items-center justify-center rounded-full"
							style={{ borderColor: active ? "#f59e0b" : completed ? "green" : "gray" }}>
							<i className="fa-thin fa-upload text-neutral-200 my-auto md:text-base text-xs"></i>
						</span>
					</span>
				</span>
			</button>
			<div className="text-neutral-400 font-thin text-xs mb-1 uppercase text-center whitespace-nowrap">SUBMIT</div>
			{active && <div className="relative bg-neutral-600 h-0.25 w-8 "></div>}
		</>
	);
};

export default Submit;
