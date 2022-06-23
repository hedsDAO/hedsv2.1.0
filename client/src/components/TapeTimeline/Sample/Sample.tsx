import React, { useState } from "react";
import { useMoralis } from "react-moralis";
import { TapeStatus, TimelineIconProps } from "../../../models/common";
import SampleModal from "../../../common/modals/SampleModal/SampleModal";
import ConnectModal from "../../../common/modals/ConnectModal/ConnectModal";
import TwitterWarningModal from "../../../common/modals/TwitterWarningModal/TwitterWarningModal";

const Sample = ({ active, completed, globalTapeData }: TimelineIconProps) => {
	const [isShowingSampleModal, setIsShowingSampleModal] = useState(false);
	const [isShowingTwitterWarningModal, setIsShowingTwitterWarningModal] = useState(false);
	const [isShowingConnectModal, setIsShowingConnectModal] = useState(false);
	const { user } = useMoralis();
	console.log(globalTapeData);
	const handleModalOpen = () => {
		if (!user) setIsShowingConnectModal(true);
		else if (!user?.attributes?.twitterHandle) {
			setIsShowingTwitterWarningModal(true);
		} else setIsShowingSampleModal(true);
	};
	return (
		<>
			{active && <i className={"fa-thin fa-file text-sm mb-1 text-amber-500"} />}
			{completed && <i className={"fa-thin fa-file text-sm mb-1 text-green-500"} />}
			{globalTapeData && (
				<>
					<TwitterWarningModal
						isShowingTwitterWarningModal={isShowingTwitterWarningModal}
						setIsShowingTwitterWarningModal={setIsShowingTwitterWarningModal}
					/>
					<ConnectModal isShowingConnectModal={isShowingConnectModal} setIsShowingConnectModal={setIsShowingConnectModal} />
					<SampleModal isShowingModal={isShowingSampleModal} setIsShowingModal={setIsShowingSampleModal} />
					<button
						disabled={globalTapeData?.status < TapeStatus.SAMPLE_OPEN}
						onClick={() => handleModalOpen()}
						className="group text-left my-2">
						<span className={`flex items-start text-sm font-medium`}>
							<span className="flex-shrink-0">
								<span
									className="md:w-12 md:h-12 w-10 h-10 border flex items-center justify-center rounded-full"
									style={{ borderColor: active ? "#f59e0b" : completed ? "green" : "gray" }}>
									<i className="fa-thin fa-waveform text-neutral-200 my-auto md:text-base text-xs"></i>
								</span>
							</span>
						</span>
					</button>
					<div className="text-neutral-400 font-thin text-xs mb-1 uppercase text-center whitespace-nowrap">SAMPLE</div>
					{active && <div className="relative bg-neutral-600 h-0.25 w-8 "></div>}
				</>
			)}
		</>
	);
};

export default Sample;
