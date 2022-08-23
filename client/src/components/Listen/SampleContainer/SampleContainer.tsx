import React from "react";
import { TapeData } from "../../../models/spaceModel";
// import { PlayIcon } from "@heroicons/react/solid";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "../../../store";
import { PlayerSize } from "../../../models/common";
import { useParams } from "react-router";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { handleDownloadFile } from "../../../utils/handleDownloadFile";
import { generateSampleLink } from "../../../utils/generateSampleLink";
import { Modals } from "../../../models/globalModel";
import { useMoralis } from "react-moralis";

const SampleContainer = (tapeData: TapeData) => {
	const { id } = useParams<{ id: string }>();
	const { user } = useMoralis();
	const dispatch = useDispatch<Dispatch>();
	const storage = getStorage();
	const sampleRef = ref(storage, generateSampleLink(id));
	const audioData = useSelector((state: RootState) => state.audioModel);
	const playSample = () => {
		const track = +tapeData.tape.no - 1;
		if (audioData?.samples?.[track]) {
			dispatch.audioModel.setCurrentTrack(track);
			dispatch.audioModel.setIsSample(true);
			dispatch.audioModel.setPlayerSize(PlayerSize.MEDIUM);
		}
	};
	const handleGetSample = () => {
		getDownloadURL(sampleRef).then((url: string) => {
			return handleDownloadFile(url, `HT${id}`);
		});
	};
	return (
		<div className="bg-gray-300 dark:bg-neutral-975 xl:rounded-none rounded-md mx-auto xl:w-screen">
			<div className="flex xl:flex-row flex-col items-center justify-center xl:justify-between max-w-2xl gap-y-2 md:mx-auto px-6 py-6 rounded-lg">
				<img
					src={tapeData?.sample?.image}
					className="item--sphere w-16 h-16 rounded-full m-0.5 justify-self-start ring-2 dark:ring-slate-300 ring-slate-700 xl:mr-2"
				/>
				<div className="flex flex-col lg:px-2 px-3 items-center xl:items-start justify-center w-full gap-x-2 xl:mb-0 mb-3">
					<span className="text-neutral-700 dark:text-neutral-200 text-xs mb-1"><i className="fa-thin fa-waveform mr-1 text-[0.65rem]" /> sample curator</span>
					<span className="text-neutral-700 dark:text-neutral-200 uppercase font-semibold tracking-widest text-lg lg:text-xl">
						{tapeData?.sample?.artist}
					</span>
					<span className="inline-flex items-baseline text-neutral-700 dark:text-neutral-300 uppercase font-regular tracking-widest text-sm lg:text-base">
						<span className="text-neutral-500 dark:text-neutral-500 tracking-tight font-light text-sm lg:text-base mr-1.5">
							bpm
						</span>{" "}
						{tapeData?.sample?.bpm}
					</span>
				</div>
				<div className="flex flex-row items-center gap-2 mx-2">
					<button
						onClick={user?.attributes?.ethAddress
							? () => handleGetSample()
							: () => dispatch.globalModel.setModal({
								open: true,
								modal: Modals.WARNING,
								locked: true
							})}
						className="inline-flex items-center shadow-sm justify-center text-center px-6 py-1 text-sm hover:bg-indigo-600 dark:hover:bg-fuchsia-800 dark:bg-fuchsia-600 bg-indigo-500 text-white rounded-sm uppercase transition-all w-full">
						<span className="my-auto tracking-widest">DOWNLOAD</span>
					</button>
					<button
						onClick={() => playSample()}
						className="inline-flex items-center shadow-sm justify-center text-center px-6 py-1 text-sm dark:hover:bg-indigo-600 hover:bg-fuchsia-800 bg-fuchsia-600 dark:bg-indigo-500 text-white rounded-sm uppercase transition-all w-full">
						<span className="my-auto tracking-widest">LISTEN</span>
					</button>
				</div>
			</div>
		</div>
	);
};
export default SampleContainer;
