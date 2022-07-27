import React, { useEffect, useState } from "react";
import { TapeData } from "../../../models/spaceModel";
import { DownloadIcon, PlayIcon } from "@heroicons/react/solid";
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
		<div className="max-w-[80rem] bg-neutral-500 dark:bg-neutral-975 flex justify-between items-center xl:mx-auto gap-1 py-1 rounded-md px-1 mx-2 mb-1">
			<div className="w-full dark:bg-neutral-900 inline-flex items-center justify-between rounded-md py-2 transition-all">
				<div className="inline-flex items-center">
					<span className="px-2.5 text-neutral-200 dark:text-neutral-400 font-serif font-semibold uppercase text-xs tracking-widest">
						<span className="text-neutral-400 dark:text-neutral-500 tracking-tight lg:inline hidden font-semibold">sample</span>{" "}
						{tapeData?.sample?.artist}
					</span>
					<span className="px-2.5 text-neutral-200 dark:text-neutral-400 font-serif uppercase text-xs font-semibold tracking-widest">
						<span className="text-neutral-400 dark:text-neutral-500 tracking-tight font-semibold">bpm</span> {tapeData?.sample?.bpm}
					</span>
				</div>
				<div className="inline-flex items-center gap-x-2.5 pr-2">
					<DownloadIcon
						onClick={
							userData?.twitterHandle
								? () => handleDownloadFile(sampleDownloadUrl, `HT${id}`)
								: () => dispatch.globalModel.setModal({ open: true, modal: Modals.WARNING, locked: true })
						}
						className="h-4 w-4 text-green-400 dark:text-green-500 hover:text-green-400 transition-all"
					/>
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
