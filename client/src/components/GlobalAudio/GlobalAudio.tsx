import React, { useEffect, useRef, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, Dispatch } from "../../store";
import WaveSurfer from "wavesurfer.js";
import { formWaveSurferOptions } from "../../utils/formWavesurferOptions";
import { formatTime } from "../../utils/formatTime";
import { PlayerSize, TrackMetadata } from "../../models/common";
import LeftAudioControls from "./LeftAudioControls/LeftAudioControls";
import RightAudioControls from "./RightAudioControls/RightAudioControls";
import TrackDetails from "./TrackDetails/TrackDetails";

const GlobalAudio = () => {
	const { MEDIUM, SMALL, HIDDEN } = PlayerSize;
	const dispatch = useDispatch<Dispatch>();
	const audioData = useSelector((state: RootState) => state.audioModel);
	const playerSize = useSelector((state: RootState) => state.audioModel?.playerSize);
	const currentTrack: number = useSelector((state: RootState) => state.audioModel?.currentTrack);
	const tracks: Array<TrackMetadata> = useSelector((state: RootState) => state.audioModel?.tracks);
	const currentTape: number = Math.floor(useSelector((state: RootState) => state.audioModel.currentTrack) / 10 + 1);
	const videoRef = useRef<HTMLVideoElement | null>(null);
	const waveformRef = useRef<HTMLDivElement | null>(null);
	const wavesurfer = useRef<WaveSurfer | null>();

	useEffect(() => {
		var options; // wavesurfer params
		if (!audioData?.tapes?.length) dispatch.audioModel.getTapeData();
		if (!audioData?.tracks?.length) dispatch.audioModel.getTrackData();
		dispatch.audioModel.setPlayerSize(MEDIUM);
		dispatch.audioModel.setIsLoading(true);
		dispatch.audioModel.setIsPlaying(false);
		if (waveformRef.current) options = formWaveSurferOptions(waveformRef.current);
		if (options) wavesurfer.current = WaveSurfer.create(options);
		if (videoRef.current) wavesurfer?.current?.load(videoRef.current);
		wavesurfer?.current?.on("audioprocess", (res: number) => dispatch.audioModel.setCurrentTime([`${formatTime(res)}`, res]));
		wavesurfer?.current?.on("ready", () => {
			dispatch.audioModel.setDuration([`${formatTime(wavesurfer?.current?.getDuration())}`, wavesurfer?.current?.getDuration() || 0]);
			wavesurfer?.current?.setVolume(1);
			dispatch.audioModel.setVolume(1);
		});
		wavesurfer?.current?.on("waveform-ready", () => {
			dispatch.audioModel.setIsLoading(false);
			dispatch.audioModel.setIsPlaying(true);
			wavesurfer?.current?.playPause();
		});
		wavesurfer?.current?.on("finish", function () {
			if (audioData?.isSample) {
				dispatch.audioModel.setIsSample(false);
				if (audioData?.tracks?.[currentTrack * 10]) dispatch.audioModel.setCurrentTrack(currentTrack * 10);
				else dispatch.audioModel.setCurrentTrack(0);
			} else {
				if (currentTrack === tracks?.length - 1) dispatch.audioModel.setCurrentTrack(0);
				if (tracks?.[currentTrack + 1]) dispatch.audioModel.setCurrentTrack(currentTrack + 1);
			}
		});
		return () => {
			wavesurfer?.current?.destroy();
		};
	}, [audioData?.currentTrack]);


	return (
		<Fragment>
			{playerSize !== HIDDEN && (
				<div
					className={`${playerSize === SMALL
						? "grid grid-cols-2 max-w-sm bg-transparent animate__animated animate__fadeInLeft delay-150 -ml-1 lg:py-2 py-3"
						: "bg-neutral-200 dark:bg-neutral-975 w-screen grid grid-cols-12 animate__animated animate__fadeInUp md:px-2 px-4 lg:py-2 py-3.5"
						} bottom-0 fixed z-50`}>
					{wavesurfer?.current && <LeftAudioControls {...wavesurfer} />}
					<div
						className={`inline-flex items-center justify-center  ${playerSize === SMALL ? "relative -bottom-96 col-span-0" : "col-span-10 px-2"
							}`}>
						<div
							className={
								playerSize === SMALL
									? "hidden"
									: playerSize === MEDIUM
										? "grid grid-cols-12 items-center min-w-[90%] relative z-50 px-3"
										: "grid grid-cols-12 min-w-full relative z-50 items-center my-5 px-3"
							}>
							<div
								className={
									playerSize === SMALL
										? "hidden"
										: playerSize === MEDIUM
											? "col-span-10 lg:col-span-2 flex items-center px-3 sm:px-5 lg:px-0 justify-start lg:justify-center"
											: "col-span-10 lg:col-span-3 flex items-center px-3 sm:px-5 lg:px-0 justify-start"
								}>
								<video
									id="full-screenVideo"
									playsInline
									key={audioData?.tracks?.[currentTrack]?.video}
									ref={videoRef}
									src={
										audioData?.isSample
											? audioData?.samples?.[currentTrack]?.video
											: audioData?.tracks?.[currentTrack]?.video
									}
									className={
										playerSize === SMALL
											? "hidden"
											: playerSize === MEDIUM
												? "h-full w-full xl:max-h-[10rem] xl:max-w-[10rem] max-h-[8rem] max-w-[8rem] object-fill rounded-md"
												: "h-full w-full xl:max-h-[30rem] xl:max-w-[30rem] max-h-[9rem] max-w-[9rem] object-fill rounded-md"
									}
								/>

								{!audioData?.isLoading ? (
									<TrackDetails {...{ audioData, currentTape, currentTrack }} />
								) : (
									<div className="flex flex-col items-start justify-center px-6 animate__animated animate__fadeIn">
										<span className="text-neutral-900 dark:text-neutral-400 text-base lg:text-lg font-base whitespace-nowrapanimate-pulse rounded-full min-w-[10ch] px-2 font-thin">
											Loading<span className="one">.</span><span className="two">.</span><span className="three">.</span>
										</span>
									</div>
								)}
							</div>
							<div
								className={
									playerSize === SMALL
										? "hidden"
										: playerSize === MEDIUM
											? "lg:h-52 lg:col-start-5 lg:col-span-8 col-span-0 w-full inline-flex justify-evenly lg:items-center items-end self-end"
											: "lg:h-80 lg:col-start-6 lg:col-span-7 col-span-0 w-full inline-flex justify-evenly lg:items-center items-end self-end"
								}>
								<span className="lg:-mx-2 min-w-[4ch] lg:text-base text-xs text-neutral-400">
									{audioData?.currentTime && !audioData?.isLoading && playerSize > SMALL && audioData?.currentTime[0]}
								</span>
								<div
									id="waveform"
									className={
										playerSize === SMALL
											? "flex-shrink-0 flex-grow-0 w-[0px]"
											: "flex-shrink-0 flex-grow-0 lg:w-full w-[0px] lg:px-10"
									}
									ref={waveformRef}
								/>
								<span className="lg:-mx-2 min-w-[4ch] lg:text-base text-xs text-neutral-600">
									{audioData?.duration && !audioData?.isLoading && playerSize > SMALL && audioData?.duration[0]}
								</span>
							</div>
						</div>
					</div>
					{audioData?.playerSize !== SMALL && <RightAudioControls {...wavesurfer} />}
				</div>
			)}
		</Fragment>
	);
};

export default GlobalAudio;
