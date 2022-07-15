import React from "react";
import { TapeData } from "../../../models/spaceModel";
import { DownloadIcon, PlayIcon } from "@heroicons/react/solid";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "../../../store";
import { PlayerSize } from "../../../models/common";

const SampleContainer = (tapeData: TapeData) => {
	const dispatch = useDispatch<Dispatch>();
	const audioData = useSelector((state: RootState) => state.audioModel);
	const playSample = () => {
		const track = +tapeData.tape.no - 1;
		if (audioData?.samples?.[track]) {
			dispatch.audioModel.setCurrentTrack(track);
			dispatch.audioModel.setIsSample(true);
			dispatch.audioModel.setPlayerSize(PlayerSize.MEDIUM);
		}
	};
	return (
		<div className="max-w-[100rem] bg-neutral-975 flex justify-between items-center lg:mx-auto gap-1 py-2.5 rounded-lg px-2 mx-2">
			<div className="w-full bg-neutral-950 inline-flex items-center justify-between rounded-md py-1.5">
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
					{!audioData?.isPlaying && !audioData?.isSample ? (
						<PlayIcon
							onClick={() => playSample()}
							className="h-4 w-4 text-neutral-400 hover:text-neutral-200 transition-all animate__animated animate__fadeIn"
						/>
					) : audioData?.isSample && audioData?.isPlaying ? (
						<PlayIcon
							onClick={() => playSample()}
							className="h-4 w-4 text-neutral-400 hover:text-neutral-200 transition-all animate-pulse"
						/>
					) : (
						<PlayIcon
							onClick={() => playSample()}
							className="h-4 w-4 text-neutral-400 hover:text-neutral-200 transition-all animate__animated animate__fadeIn"
						/>
					)}
				</div>
			</div>
		</div>
	);
};
export default SampleContainer;
