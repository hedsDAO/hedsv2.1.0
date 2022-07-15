import React, { Fragment } from "react";
import { DownloadIcon, PlayIcon } from "@heroicons/react/solid";
import { TapeData } from "../../../models/spaceModel";
import SampleContainer from "../SampleContainer/SampleContainer";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "../../../store";
import { PlayerSize } from "../../../models/common";
import LoadingIcon from "../../../common/svg/LoadingIcon/LoadingIcon";

const TapeHeader = (tapeData: TapeData) => {
	const dispatch = useDispatch<Dispatch>();
	// const playSample = () => {
	// 	const track = (+tapeData.tape.no - 1) * 10;
	// 	if (audioData?.tracks?.[track]) {
	// 		dispatch.audioModel.setIsSample(false);
	// 		dispatch.audioModel.setCurrentTrack(track);
	// 		dispatch.audioModel.setPlayerSize(PlayerSize.MEDIUM);
	// 	}
	// };

	return (
		<Fragment>
			<div className="max-w-[100rem] lg:mx-auto rounded-lg mx-2 bg-neutral-975 p-2 mt-10 mb-1.5">
				<div className="lg:z-10 max-w-[100rem] lg:mx-auto listen-gradient rounded-md py-10">
					<div className="lg:max-w-6xl lg:px-1 lg:grid lg:grid-cols-5 lg:gap-2 lg:mx-auto items-center">
						<div className="flex justify-center lg:col-span-2 px-2 lg:pt-0 pt-10">
							<img
								className="object-contain rounded-lg w-[85%] sm:w-[50%] lg:w-[18rem] bg-neutral-900"
								src={tapeData.tape?.image}
							/>
						</div>
						<div className="lg:col-span-3">
							<SampleContainer {...tapeData} />
							<div className="px-10 lg:max-w-xl ">
								<div className="flex flex-col md:items-start items-center">
									<div className="lg:px-0 px-5 bg-opacity-60 text-neutral-300 text-sm text-center md:text-left tracking-wider min-h-[75px] lg:pb-0 lg:pt-0 pb-10 pt-5">
										{tapeData.tape?.description}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="max-w-[100rem] flex justify-between items-center lg:mx-auto gap-1 py-2 rounded-lg px-2 mx-2">
				<div className="w-full bg-neutral-900 inline-flex items-center justify-between rounded-md py-1.5">
					<div className="inline-flex items-center">
						<span className="px-2.5 text-neutral-400 font-serif font-semibold uppercase text-xs tracking-widest">
							<span className="text-neutral-500 tracking-tight lg:inline hidden font-semibold">sample:</span>{" "}
							{tapeData?.sample?.artist}
						</span>
						<span className="px-2.5 text-neutral-400 font-serif uppercase text-xs font-semibold tracking-widest">
							<span className="text-neutral-500 tracking-tight font-semibold">bpm:</span> {tapeData?.sample?.bpm}
						</span>
					</div>
					<div className="inline-flex items-center gap-x-2.5 pr-2">
						<DownloadIcon className="h-4 w-4 text-neutral-400" />
						<PlayIcon className="h-4 w-4 text-neutral-400" />
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default TapeHeader;
