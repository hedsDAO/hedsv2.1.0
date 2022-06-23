import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { TapeContainerProps } from "../../../models/common";
import Playlist from "../../../common/audio/Playlist/Playlist";
import Waveform from "../../../common/audio/Waveform/Waveform";
import ArrowLinkButton from "../../buttons/ArrowLinkButton/ArrowLinkButton";

const TapeContainer = ({ tapeNum, tracks }: TapeContainerProps) => {
	const [selectedTrack, setSelectedTrack] = useState("0");
	const globalTapesData = useSelector((state: RootState) => state.globalTapesModel);
	const tapesState = useSelector((state: RootState) => state.tapesModel);
	const currentTape = globalTapesData?.hedstapes?.[tapeNum - 1];
	return (
		<div className="mx-3 xl:mx-0 my-2 rounded-sm">
			{globalTapesData.hedstapes?.length && (
				<div className="flex bg-neutral-900 border border-neutral-300 w-full md:max-w-7xl transition-all rounded-sm justify-between items-center mx-auto pl-3 py-2">
					<img
						src={currentTape?.image}
						alt={currentTape?.name}
						className="w-3/12 sm:w-3/12 h-full max-h-8 lg:max-h-12 my-2 rounded-t-sm object-center object-cover ml-2"
					/>
					<div className="flex items-center font-extralight tracking-widest text-neutral-100">
						<img
							className="hidden sm:inline h-10 w-10 ring-1 ring-neutral-800 p-0.5 rounded-full my-auto mr-3"
							src={currentTape?.sample?.image}
						/>
						<div>
							<span className="text-neutral-400 text-base">{currentTape?.name}</span>
							<p className="text-sm font-base tracking-widest text-amber-500 uppercase group-hover:text-gray-200 ease-in-out duration-300">
								{currentTape?.sample?.artist}
							</p>
						</div>
					</div>
					<ArrowLinkButton currentTape={currentTape} />
				</div>
			)}
			{tracks && tapesState?.tracks?.length && (
				<div
					className={`mx-auto max-w-7xl sm:flex-row flex-col-reverse flex border border-neutral-300 transition-all pt-5 pb-8 px-5`}>
					<div className="pb-2 sm:w-3/12 ">
						<Playlist selectedTrack={selectedTrack} setSelectedTrack={setSelectedTrack} tapeData={tapesState.tracks} />
					</div>
					<div className="w-12/12 sm:w-9/12 sm:px-4 ">
						<Waveform selectedTrack={selectedTrack} url={tapesState?.tracks[selectedTrack]?.video_link} tapeData={tapesState} />
					</div>
				</div>
			)}
		</div>
	);
};

export default TapeContainer;
