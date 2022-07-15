import React from "react";
import { TapeData } from "../../../models/spaceModel";
// import { PlayIcon, DownloadIcon } from "@heroicons/react/solid";
// import { useDispatch } from "react-redux";
// import { Dispatch } from "../../../store";
// import { PlayerSize } from "../../../models/common";

const SampleContainer = (tapeData: TapeData) => {
	// const dispatch = useDispatch<Dispatch>();
	// const playTrack = () => {
	// 	dispatch.audioModel.setIsSample(true);
	// 	dispatch.audioModel.setPlayerSize(PlayerSize.MEDIUM);
	// 	dispatch.audioModel.setCurrentTrack(tapeData.tape?.id);
	// };
	return (
		<div className="grid grid-cols-12 gap-x-5 lg:max-w-lg mt-2 mx-5 sm:px-5 lg:items-start items-center">
			<div className="col-span-12 lg:px-0 px-2 lg:col-span-1 h-full flex items-center justify-center lg:justify-start">
				<div className="flex flex-col justify-start items-center lg:items-start lg:mt-0 mt-10">
					<div className="flex items-center justify-start mb-4">
						<img
							src={tapeData?.sample?.image}
							className="h-20 w-20 aspect-square inline-block rounded-full item item--sphere flex-shrink-0 flex-grow-0"
						/>
						<img
							src={tapeData?.collab?.image}
							className="h-20 w-20 aspect-square inline-block rounded-full bg-neutral-900 p-2 item item--sphere flex-shrink-0 flex-grow-0 -ml-2"
						/>
					</div>
					<div className="inline-flex items-center">
						<span className="text-neutral-300 font-serif text-xs mt-2 mb-1 tracking-widest whitespace-nowrap pr-1 py-1 mr-0.5">
							heds
						</span>
						<span className="text-neutral-300 font-serif text-xs mt-2 mb-1 tracking-widest whitespace-nowrap pr-1 py-1 mr-0.5">
							/
						</span>
						<span className="text-neutral-300 font-serif text-xs mt-2 mb-1 tracking-widest whitespace-nowrap pr-1 py-1 mr-0.5">
							hedTAPE
						</span>
						<span className="text-neutral-300 font-serif text-xs mt-2 mb-1 tracking-widest whitespace-nowrap pr-1 py-1 mr-0.5">
							/
						</span>
						<span className="text-neutral-300 font-serif text-xs mt-2 mb-1 tracking-widest whitespace-nowrap pr-1 py-1 mr-0.5">
							{tapeData?.tape?.no}
						</span>
					</div>
					<span className="text-neutral-100 text-2xl uppercase tracking-widest whitespace-nowrap mb-3">
						{tapeData?.sample?.artist} <span className="lowercase">x</span> Heds
					</span>
				</div>
			</div>
		</div>
	);
};
export default SampleContainer;
