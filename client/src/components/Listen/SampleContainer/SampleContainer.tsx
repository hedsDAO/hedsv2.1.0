import React from "react";
import { PlayIcon, DownloadIcon } from "@heroicons/react/solid";
import { TapeData } from "../../../models/spaceModel";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "../../../store";
import { PlayerSize } from "../../../models/common";

const SampleContainer = (tapeData: TapeData) => {
	const dispatch = useDispatch<Dispatch>();
	const sampleData = useSelector((state: RootState) => state.audioModel.samples);
	const playTrack = () => {
		if (!sampleData?.length) dispatch.audioModel.getSamples();
		dispatch.audioModel.setIsSample(true);
		dispatch.audioModel.setPlayerSize(PlayerSize.SMALL);
		dispatch.audioModel.setCurrentTrack(tapeData.tape?.id);
	};
	return (
		<div className="grid grid-cols-12 gap-x-5 max-w-lg mx-auto mt-2 px-4 py-3 sm:p-6 bg-neutral-950  border-neutral-800 shadow-sm border-[0.25px] sm:rounded-lg -mb-10">
			<button onClick={() => playTrack()} className="col-span-4 flex flex-col items-center justify-center">
				<div className="w-32 h-32 my-2 group">
					<img
						src={tapeData.sample?.image}
						className="w-32 h-32 mx-auto p-0.5 ease-in-out rounded-full group-hover:opacity-25 transition-opacity"
					/>
					<PlayIcon className="h-7 w-7 relative -mt-[76px] ml-[50px] text-neutral-300 -z-50 group-hover:z-30 transition-all" />
				</div>
			</button>
			<div className="col-span-8 flex flex-col items-center justify-center">
				<div className="flex items-center justify-between w-full bg-neutral-850 text-neutral-400 uppercase px-2 py-1.5 rounded-lg">
					<span className="ml-1">artist</span>
					<span className="bg-neutral-950 text-xs lg:text-sm text-neutral-300 px-2.5 py-0.25 rounded-md tracking-widest">
						{tapeData.sample?.artist}
					</span>
				</div>
				<div className="flex items-center justify-between w-full bg-neutral-850 text-neutral-400 uppercase px-2 py-1.5 rounded-lg mt-2">
					<span className="ml-1">bpm</span>
					<span className="bg-neutral-950 text-xs lg:text-sm text-neutral-300 px-2.5 py-0.25 rounded-md tracking-widest">
						{tapeData.sample?.bpm}
					</span>
				</div>
				<div className="flex items-center justify-between w-full bg-neutral-850 text-neutral-400 uppercase px-2 py-1.5 rounded-lg mt-2">
					<span className="ml-1">download</span>
					<button className="bg-neutral-950 text-sm text-neutral-300 px-2 py-0.5 rounded-md tracking-widest">
						<DownloadIcon className="h-4 w-4 text-center text-neutral-300 z-40 transition-all" aria-hidden="true" />
					</button>
				</div>
			</div>
		</div>
	);
};
export default SampleContainer;
