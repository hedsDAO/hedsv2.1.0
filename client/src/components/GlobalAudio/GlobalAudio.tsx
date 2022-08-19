import React, { useEffect, useRef, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, Dispatch } from "../../store";
import WaveSurfer from "wavesurfer.js";
import { formWaveSurferOptions } from "../../utils/formWavesurferOptions";
import { formatTime } from "../../utils/formatTime";
import { PlayerSize, TrackMetadata } from "../../models/common";
import TrackDetails from "./TrackDetails/TrackDetails";
import LoadingIcon from "../../common/svg/LoadingIcon/LoadingIcon";
import PlayIcon from "../../common/svg/PlayIcon/PlayIcon";
import PauseIcon from "../../common/svg/PauseIcon/PauseIcon";

const GlobalAudio = () => {
	const { SMALL, MINIMIZED, HIDDEN } = PlayerSize;
	const dispatch = useDispatch<Dispatch>();
	const audioData = useSelector((state: RootState) => state.audioModel);
	const playerSize = useSelector((state: RootState) => state.audioModel?.playerSize);
	const currentTrack: number = useSelector((state: RootState) => state.audioModel?.currentTrack);
	const tracks: Array<TrackMetadata> = useSelector((state: RootState) => state.audioModel?.tracks);
	const currentTape: number = Math.floor(useSelector((state: RootState) => state.audioModel.currentTrack) / 10 + 1);
	// const videoRef = useRef<HTMLVideoElement | null>(null);
	const waveformRef = useRef<HTMLDivElement | null>(null);
	const wavesurfer = useRef<WaveSurfer | null>();

	useEffect(() => {
		var options; // wavesurfer params
		if (!audioData?.tapes?.length) dispatch.audioModel.getTapeData();
		if (!audioData?.tracks?.length) dispatch.audioModel.getTrackData();
		dispatch.audioModel.setPlayerSize(SMALL);
		dispatch.audioModel.setIsLoading(true);
		dispatch.audioModel.setIsPlaying(false);
		if (waveformRef.current) options = formWaveSurferOptions(waveformRef.current);
		if (options) wavesurfer.current = WaveSurfer.create(options);
		wavesurfer?.current?.load(audioData?.tracks?.[currentTrack]?.audio);
		wavesurfer?.current?.on("audioprocess", (res: number) => dispatch.audioModel.setCurrentTime([`${formatTime(res)}`, res]));
		wavesurfer?.current?.on("ready", () => {
			dispatch.audioModel.setDuration([`${formatTime(wavesurfer?.current?.getDuration())}`, wavesurfer?.current?.getDuration() || 0]);
			wavesurfer?.current?.setVolume(1);
			dispatch.audioModel.setVolume(1);
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
	}, [audioData?.currentTrack, audioData?.tracks?.[currentTrack]?.audio]);


	return (
		<Fragment>
			{playerSize !== HIDDEN && (
				<div className="bg-neutral-200 dark:bg-neutral-975 animate__animated animate__fadeInUp bottom-0 fixed z-50">
					<div className="w-screen flex justify-between gap-x-1 bg-gray-300 dark:bg-neutral-950 py-0.5 px-3">
						<i onClick={() => {
							dispatch.audioModel.setAudioOff({
								playerSize: PlayerSize.HIDDEN,
								isPlaying: false,
								isLoading: false,
								volume: 0,
							});
						}} className="fa-solid fa-xmark text-red-500 text-xs"></i>
						{playerSize === MINIMIZED ? <i onClick={() => dispatch.audioModel.setPlayerSize(SMALL)} className="fa-solid fa-caret-up text-teal-500 text-xs"></i> : <i onClick={() => dispatch.audioModel.setPlayerSize(MINIMIZED)} className="fa-solid fa-caret-down text-teal-500 text-xs"></i>}
					</div>
					<div className={playerSize === MINIMIZED ? "hidden" : "inline-flex items-center w-screen py-2.5 px-2.5 animate__animated animate__fadeInUp"}>
						<div className="flex lg:w-[10%]">
							<img className="h-full w-full xl:max-h-[4rem] xl:max-w-[4rem] max-h-[4rem] max-w-[4rem] object-fill rounded-sm mr-3" src={audioData?.tapes[currentTape - 1]?.tape?.image} />
							<TrackDetails {...{ audioData, currentTape, currentTrack }} />
						</div>
						<div className="flex items-center lg:justify-center justify-end gap-x-2 w-[50%] lg:w-[10%]">
							<button
								disabled={audioData?.isLoading}
								onClick={() => {
									if (tracks?.[currentTrack - 1]) dispatch.audioModel.setCurrentTrack(currentTrack - 1);
									else dispatch.audioModel.setCurrentTrack(tracks.length - 1);
								}}
								className="inline-flex items-center">
								<i className="fa-solid fa-backward lg:text-base text-xs text-neutral-900 dark:text-neutral-300"></i>
							</button>
							{audioData?.isLoading && <LoadingIcon />}
							{!audioData?.isPlaying && !audioData?.isLoading && <PlayIcon {...wavesurfer} />}
							{audioData?.isPlaying && !audioData?.isLoading && <PauseIcon {...wavesurfer} />}
							<button
								disabled={audioData?.isLoading}
								onClick={() => {
									if (tracks?.[currentTrack + 1]) dispatch.audioModel.setCurrentTrack(currentTrack + 1);
									else dispatch.audioModel.setCurrentTrack(0);
								}}
								className="inline-flex items-center">
								<i className="fa-solid fa-forward lg:text-base text-xs text-neutral-900 dark:text-neutral-300"></i>
							</button>
						</div>
						<div id="waveform-global" className="flex-shrink-0 flex-grow-0 lg:max-w-[70%] lg:w-screen w-[0px] mx-2" ref={waveformRef} />
						<div className="lg:w-[3%] flex lg:justify-end">
							<span className="min-w-[4ch] lg:text-sm text-xs text-neutral-900 dark:text-neutral-400">
								{audioData?.currentTime && !audioData?.isLoading && playerSize > HIDDEN && audioData?.currentTime[0]}
							</span>
						</div>
						<div className="lg:w-[3%] flex lg:justify-start">
							<span className="min-w-[4ch] lg:text-sm text-xs text-neutral-700 dark:text-neutral-600">
								{audioData?.duration && !audioData?.isLoading && playerSize > HIDDEN && audioData?.duration[0]}
							</span>
						</div>
					</div>
				</div>
			)}
		</Fragment>
	);
};

export default GlobalAudio;
