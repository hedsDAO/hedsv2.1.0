import React, { Fragment } from "react";
import { TapeData } from "../../../models/spaceModel";
import { PlayIcon } from "@heroicons/react/solid";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "../../../store";
import { PlayerSize, TapeStatus } from "../../../models/common";
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
			dispatch.audioModel.setPlayerSize(PlayerSize.SMALL);
		}
	};
	const handleGetSample = () => {
		getDownloadURL(sampleRef).then((url: string) => {
			console.log(url);
			return handleDownloadFile(url, `HT${id}`)
		});

	}
	return (
		<Fragment>
			<div className="w-full min-w-full  lg:max-w-lg gap-1 lg:mx-auto">
				<div className="inline-flex lg:justify-center items-baseline rounded-md px-1.5 w-full xl:mt-4 mt-3 mb-1.5">
					<i className="fa-regular fa-waveform text-neutral-700 dark:text-neutral-400 text-xs place-self-center self-center -mb-0.25" />
					<span className="text-neutral-700 dark:text-neutral-400 tracking-widest px-3 font-semibold text-lg">SAMPLE CURATOR</span>
				</div>
				<div className="bg-gray-300 dark:bg-neutral-975 rounded-md p-1">
					<div className="flex justify-between lg:justify-evenly items-center lg:mx-auto bg-neutral-200 dark:bg-neutral-900 rounded-sm px-4 py-3">
						<img src={tapeData?.sample?.image} className="w-16 h-16 rounded-md m-0.5 justify-self-start" />
						<div className="flex flex-col lg:px-2 px-3 items-start justify-center w-full">
							<span className="lg:px-2.5 text-neutral-700 dark:text-neutral-400 font-extralight uppercase tracking-widest text-xs lg:text-base">
								{tapeData?.sample?.artist}
							</span>
							<span className="inline-flex items-baseline lg:px-2.5 text-neutral-700 dark:text-neutral-300 uppercase font-regular tracking-widest text-sm lg:text-base">
								<span className="text-neutral-500 dark:text-neutral-500 tracking-tight font-thin text-sm lg:text-base mr-2">bpm</span> {tapeData?.sample?.bpm}
							</span>
						</div>
						<div className="flex justify-center items-center">
							<div className="flex justify-center items-center hover:bg-neutral-300 dark:hover:bg-neutral-700 bg-gray-300 dark:bg-neutral-850 rounded-md py-1 px-3 mx-1 transition-all">
								<button onClick={
									user?.attributes?.ethAddress
										? () => handleGetSample()
										: () => dispatch.globalModel.setModal({ open: true, modal: Modals.WARNING, locked: true })
								} className="text-neutral-800 dark:text-neutral-400 tracking-widest font-medium text-xs lg:text-sm">DOWNLOAD</button>
							</div>
							<button onClick={() => playSample()} className="flex justify-center items-center hover:bg-neutral-300 dark:hover:bg-neutral-700 bg-gray-300 dark:bg-neutral-850 rounded-md py-[0.4rem] px-2 mx-1 group">
								{!audioData?.isPlaying && !audioData?.isSample ? (
									<PlayIcon
										className="h-4 w-4 dark:text-neutral-400 text-neutral-700 hover:text-neutral-600 transition-all animate__animated animate__fadeIn"
									/>
								) : audioData?.isSample && audioData?.isPlaying ? (
									<PlayIcon
										className="h-4 w-4 dark:text-neutral-400 text-neutral-700 group-hover:text-neutral-600 dark:group-hover:text-neutral-600 transition-all animate-pulse"
									/>
								) : (
									<PlayIcon
										className="h-4 w-4 dark:text-neutral-400 text-neutral-700 group-hover:text-neutral-600 dark:group-hover:text-neutral-600 transition-all animate__animated animate__fadeIn"
									/>
								)}
							</button>
						</div>
					</div>
					{+tapeData?.status?.status < TapeStatus.SUBMIT_CLOSE && <div className="flex justify-center pt-1 pb-0.5 px-1 items-baseline">
						<i className="fa-regular fa-circle-info mr-1 dark:text-red-400 text-red-600 text-xs"></i>
						<span className="dark:text-red-400 text-red-600 text-xs uppercase">Submission must be{" "}
							<span className="font-semibold">60-90 seconds </span> at
							<span className="font-semibold"> {tapeData?.sample?.bpm} bpm</span></span>
					</div>}
				</div>
			</div>
		</Fragment>
	);
};
export default SampleContainer;
