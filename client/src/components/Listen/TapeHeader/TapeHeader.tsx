import React from "react";
import { PlayIcon } from "@heroicons/react/solid";
import { TapeData } from "../../../models/spaceModel";
import SampleContainer from "../SampleContainer/SampleContainer";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "../../../store";
import { PlayerSize } from "../../../models/common";
import LoadingIcon from "../../../common/svg/LoadingIcon/LoadingIcon";

const TapeHeader = (tapeData: TapeData) => {
	const dispatch = useDispatch<Dispatch>();
	const audioData = useSelector((state: RootState) => state.audioModel);
	const playTrack = () => {
		const track = (+tapeData.tape.no - 1) * 10;
		if (audioData?.tracks?.[track]) {
			dispatch.audioModel.setIsSample(false);
			dispatch.audioModel.setCurrentTrack(track);
			dispatch.audioModel.setPlayerSize(PlayerSize.MEDIUM);
		}
	};
	return (
		<div
			className={`lg:pb-0 lg:z-10 lg:py-10 bg-[#141414] mt-10 lg:mt-1 lg:-mb-10 w-screen mx-auto border-[0.25px] border-neutral-800`}>
			<div className="lg:max-w-6xl lg:px-1 lg:grid lg:grid-cols-5 lg:gap-2 lg:mx-auto items-center">
				<div className="flex justify-center lg:col-span-2 px-2 lg:py-5 py-4">
					<div
						className={
							audioData?.tracks?.[(+tapeData.tape.no - 1) * 10]
								? "hidden lg:flex flex-col items-center group -mt-24"
								: "hidden lg:flex flex-col items-center -mt-24"
						}>
						<img
							className="object-contain rounded-lg w-full group-hover:opacity-60 transition-opacity bg-neutral-900"
							src={tapeData.tape?.image}
						/>
						{
							<button
								className="relative -mt-[52%] w-8 h-8 text-neutral-300 -z-50 group-hover:z-30 transition-all"
								disabled={audioData?.isLoading}
								onClick={() => playTrack()}>
								{audioData?.isLoading ? (
									<LoadingIcon className="inline -mt-5 w-6 h-6 text-gray-200 animate-spin fill-neutral-900" />
								) : (
									<PlayIcon className="relative -mt-[52%] w-8 h-8 text-neutral-300 -z-50 group-hover:z-30 transition-all" />
								)}
							</button>
						}
					</div>
					<div className="lg:hidden flex items-center justify-end flex-col mt-4">
						<img
							className="object-contain rounded-full w-[60%] group-hover:opacity-25 transition-opacity"
							src={tapeData.tape?.image}
						/>
					</div>
				</div>
				<div className="lg:col-span-3">
					<div className="px-10 lg:max-w-xl py-5 lg:py-8">
						<div className="flex flex-col md:items-start items-center">
							<div className="mt-4 lg:mt-0 text-4xl font-thin font-serif text-neutral-200 text-center md:text-left">
								<span className="rounded-sm py-0.5">{tapeData.tape?.name}</span>
							</div>
							<div className="lg:px-0 px-5 lg:py-2 py-1.5 bg-opacity-60 text-neutral-500 text-sm mt-2 text-center md:text-left tracking-wider min-h-[75px]">
								{tapeData.tape?.description}
							</div>
						</div>
					</div>
					<SampleContainer {...tapeData} />
				</div>
			</div>
		</div>
	);
};

export default TapeHeader;
