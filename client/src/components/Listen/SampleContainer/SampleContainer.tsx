import React, { useEffect, useState } from "react";
import { TapeData } from "../../../models/spaceModel";
import { PlayIcon } from "@heroicons/react/solid";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "../../../store";
import { PlayerSize } from "../../../models/common";
import { useParams } from "react-router";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { handleDownloadFile } from "../../../utils/handleDownloadFile";
import { Modals } from "../../../models/globalModel";

const SampleContainer = (tapeData: TapeData) => {
	const { id } = useParams<{ id: string }>();
	const storage = getStorage();
	const sampleRef = ref(storage, id !== "6" ? `public/samples/ht${id}.mp3` : `public/samples/ht${id}.zip`);
	const [sampleDownloadUrl, setSampleDownloadUrl] = useState<string>("");
	const dispatch = useDispatch<Dispatch>();
	const audioData = useSelector((state: RootState) => state.audioModel);
	const userData = useSelector((state: RootState) => state.userModel);
	const playSample = () => {
		const track = +tapeData.tape.no - 1;
		if (audioData?.samples?.[track]) {
			dispatch.audioModel.setCurrentTrack(track);
			dispatch.audioModel.setIsSample(true);
			dispatch.audioModel.setPlayerSize(PlayerSize.MEDIUM);
		}
	};
	useEffect(() => {
		getDownloadURL(sampleRef).then((url: string) => {
			setSampleDownloadUrl(url);
		});
	}, []);
	return (
		<div className="w-full max-w-lg mx-auto gap-1 m-1 mb-2 lg:mb-6 px-2">
			<div className="flex justify-center items-center rounded-md px-3">
				<span className="text-neutral-700 dark:text-neutral-400 tracking-widest px-3 font-semibold text-xl mb-3">
					<i className="fa-regular fa-waveform text-neutral-800 dark:text-neutral-400 mr-1" /> THE SAMPLE</span>
			</div>
			<div className="flex justify-between lg:justify-evenly items-center lg:mx-auto bg-neutral-300 dark:bg-neutral-950 rounded-lg px-4 py-3.5">
				<img src={tapeData?.sample?.image} className="w-16 h-16 rounded-md m-0.5 justify-self-start" />
				<div className="flex flex-col lg:px-2 px-3 items-start justify-center w-full">
					<span className="lg:px-2.5 text-neutral-700 dark:text-neutral-400 font-medium uppercase tracking-widest text-xs lg:text-base">
						{tapeData?.sample?.artist}
					</span>
					<span className="inline-flex items-baseline lg:px-2.5 text-neutral-700 dark:text-neutral-400 uppercase font-semibold tracking-widest text-sm lg:text-base">
						<span className="text-neutral-500 dark:text-neutral-500 tracking-tight font-medium text-sm lg:text-base mr-2">bpm</span> {tapeData?.sample?.bpm}
					</span>
				</div>
				<div className="flex justify-center items-center">
					<div className="flex justify-center items-center hover:bg-neutral-100 dark:hover:bg-neutral-700 bg-neutral-200 dark:bg-neutral-850 rounded-md py-1.5 px-2.5 mx-1 transition-all">
						<button onClick={
							userData?.twitterHandle
								? () => handleDownloadFile(sampleDownloadUrl, `HT${id}`)
								: () => dispatch.globalModel.setModal({ open: true, modal: Modals.WARNING, locked: true })
						} className="text-neutral-950 dark:text-neutral-400 tracking-widest text-xs lg:text-sm">DOWNLOAD</button>
					</div>
					<div className="flex justify-center items-center bg-neutral-200 dark:bg-neutral-850 rounded-md py-1.5 px-2 mx-1">
						{!audioData?.isPlaying && !audioData?.isSample ? (
							<PlayIcon
								onClick={() => playSample()}
								className="lg:h-5 lg:w-5 h-4 w-4 dark:text-neutral-400 text-neutral-700 hover:text-neutral-500 transition-all animate__animated animate__fadeIn"
							/>
						) : audioData?.isSample && audioData?.isPlaying ? (
							<PlayIcon
								onClick={() => playSample()}
								className="lg:h-5 lg:w-5 h-4 w-4 dark:text-neutral-400 text-neutral-700 hover:text-neutral-500 transition-all animate-pulse"
							/>
						) : (
							<PlayIcon
								onClick={() => playSample()}
								className="lg:h-5 lg:w-5 h-4 w-4 dark:text-neutral-400 text-neutral-700 hover:text-neutral-500 transition-all animate__animated animate__fadeIn"
							/>
						)}
					</div>
				</div>
			</div>
			{/* <div className="inline-flex items-center">
		
				</div> */}
			{/* <div className="inline-flex items-center gap-x-2 pr-2">
					<DownloadIcon
						
						className="h-4 w-4 text-green-300 dark:text-green-500 hover:text-green-400 transition-all"
					/>
					{!audioData?.isPlaying && !audioData?.isSample ? (
						<PlayIcon
							onClick={() => playSample()}
							className="h-4 w-4 text-neutral-400 hover:text-neutral-500 transition-all animate__animated animate__fadeIn"
						/>
					) : audioData?.isSample && audioData?.isPlaying ? (
						<PlayIcon
							onClick={() => playSample()}
							className="h-4 w-4 text-neutral-400 hover:text-neutral-500 transition-all animate-pulse"
						/>
					) : (
						<PlayIcon
							onClick={() => playSample()}
							className="h-4 w-4 text-neutral-400 hover:text-neutral-500 transition-all animate__animated animate__fadeIn"
						/>
					)}
				</div> */}
		</div>
	);
};
export default SampleContainer;
