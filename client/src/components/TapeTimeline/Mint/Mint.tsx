import React, { useState } from "react";
import MintModal from "../../../common/modals/MintModal/MintModal";
import ConnectModal from "../../../common/modals/ConnectModal/ConnectModal";
import { useMoralis } from "react-moralis";
import { useParams } from "react-router";
import { RootState } from "../../../store";
import { useSelector } from "react-redux";
import { TimelineIconProps } from "../../../models/common";

const Mint = ({ active, completed }: TimelineIconProps) => {
	const { user } = useMoralis();
	const [isShowingMintModal, setIsShowingMintModal] = useState(false);
	const [isShowingConnectModal, setIsShowingConnectModal] = useState(false);
	const { id } = useParams<{ space?: string; tape: string; id: string }>();
	const globalTapesData = useSelector((state: RootState) => state.globalTapesModel);
	const globalTapeData = globalTapesData?.hedstapes?.[parseInt(id) - 1];
	const handleModalOpen = () => {
		if (!user) setIsShowingConnectModal(true);
		else setIsShowingMintModal(true);
	};
	return (
		<>
			{completed && <i className={"fa-light fa-check text-sm text-green-500 mb-1"}></i>}
			{globalTapeData && (
				<>
					<ConnectModal isShowingConnectModal={isShowingConnectModal} setIsShowingConnectModal={setIsShowingConnectModal} />
					<MintModal
						isShowingMintModal={isShowingMintModal}
						setIsShowingMintModal={setIsShowingMintModal}
						tapeNum={`${globalTapeData?.no}`}
					/>
					<button disabled={globalTapeData.status !== 7} onClick={active ? () => handleModalOpen() : () => {}} className="group text-left my-2">
						<span className={"flex items-center text-sm font-medium"}>
							<span className="flex-shrink-0">
								<span
									className="md:w-12 md:h-12 w-10 h-10  border flex items-center justify-center rounded-full"
									style={{ borderColor: completed ? "green" : active ? "#f59e0b" : "gray" }}>
									<i className="fa-thin fa-cassette-tape text-neutral-200 my-auto md:text-base text-xs"></i>
								</span>
							</span>
						</span>
					</button>
				</>
			)}
			<div className="text-neutral-400 font-thin text-xs mb-1 uppercase text-center whitespace-nowrap">MINT</div>
			{active && <div className="relative bg-neutral-600 h-0.25 w-8 "></div>}
		</>
	);
};

export default Mint;
