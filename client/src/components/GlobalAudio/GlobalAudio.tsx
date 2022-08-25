import React, { useEffect, useRef, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, Dispatch } from "../../store";
import WaveSurfer from "wavesurfer.js";
import { formWaveSurferOptions } from "../../utils/formWavesurferOptions";
import { formatTime } from "../../utils/formatTime";
import { PlayerSize } from "../../models/common";
import TrackDetails from "./TrackDetails/TrackDetails";
import LoadingIcon from "../../common/svg/LoadingIcon/LoadingIcon";
import PlayIcon from "../../common/svg/PlayIcon/PlayIcon";
import PauseIcon from "../../common/svg/PauseIcon/PauseIcon";
import Marquee from "react-fast-marquee";

const GlobalAudio = () => {
	const { SMALL, MINIMIZED, HIDDEN } = PlayerSize;
	const dispatch = useDispatch<Dispatch>();
	const audioData = useSelector((state: RootState) => state.audioModel);
	const playerSize = useSelector((state: RootState) => state.audioModel?.playerSize);
	const { currentTape, currentTrack, currentTapeId } = useSelector(
		(state: RootState) => state.audioModel
	);
	const tapeData = useSelector((state: RootState) => state.tapeModel);
	const waveformRef = useRef<HTMLDivElement | null>(null);
	const wavesurfer = useRef<WaveSurfer | null>();

	useEffect(() => {
		var options; // wavesurfer params
		dispatch.audioModel.setPlayerSize(SMALL);
		dispatch.audioModel.setIsLoading(true);
		dispatch.audioModel.setIsPlaying(false);
		if (waveformRef.current) options = formWaveSurferOptions(waveformRef.current);
		if (options) wavesurfer.current = WaveSurfer.create(options);
		if (audioData?.isSample)
			wavesurfer?.current?.load(
				tapeData?.tapes?.[currentTape]?.[currentTrack]?.sample?.audio
			);
		else
			wavesurfer?.current?.load(
				tapeData?.tracks?.[currentTape]?.[currentTapeId]?.[currentTrack]?.audio
			);
		wavesurfer?.current?.on("audioprocess", (res: number) => dispatch.audioModel.setCurrentTime([`${formatTime(res)}`, res]));
		wavesurfer?.current?.on("ready", () => {
			dispatch.audioModel.setDuration([
				`${formatTime(wavesurfer?.current?.getDuration())}`,
				wavesurfer?.current?.getDuration() || 0,
			]);
			wavesurfer?.current?.setVolume(1);
			dispatch.audioModel.setVolume(1);
			dispatch.audioModel.setIsLoading(false);
			dispatch.audioModel.setIsPlaying(true);
			wavesurfer?.current?.playPause();
		});
		wavesurfer?.current?.on("finish", function () {
			// if (audioData?.samples && audioData?.isSample) {
			// 	dispatch.audioModel.setIsSample(false);
			// 	if (audioData?.tracks?.[+currentTrack + 10]) dispatch.audioModel.setCurrentTrack(currentTrack * 10);
			// 	else dispatch.audioModel.setCurrentTrack(0);
			// } else {
			// 	if (currentTrack === tracks?.length - 1) dispatch.audioModel.setCurrentTrack(0);
			// 	if (tracks?.[currentTrack + 1]) dispatch.audioModel.setCurrentTrack(currentTrack + 1);
			// }
		});
		return () => {
			wavesurfer?.current?.destroy();
		};
	}, [audioData?.currentTrack, audioData?.currentTapeId]);

	return (
		<Fragment>
			{playerSize !== HIDDEN && (
				<div className="bg-neutral-200 dark:bg-neutral-975 animate__animated animate__fadeInUp bottom-0 fixed z-50">
					<div className="w-screen flex justify-start gap-x-1 bg-gray-300 dark:bg-neutral-950 dark:border-neutral-900 border-gray-400 border py-1 lg:py-1.5 px-2.5">
						<div className="flex gap-x-1">
							<button
								onClick={() => {
									dispatch.audioModel.setAudioOff({
										playerSize: PlayerSize.HIDDEN,
										isPlaying: false,
										isLoading: false,
										volume: 0,
									});
								}}
								className="bg-gray-200 hover:bg-gray-100 dark:bg-neutral-900 dark:border-neutral-800 border-gray-400 border rounded-md px-1.5 dark:hover:bg-neutral-700 inline-flex items-center transition-all">
								<i className="fa-solid fa-xmark text-red-500 text-xs"></i>
							</button>
							<button
								onClick={() => {
									if (playerSize === MINIMIZED)
										dispatch.audioModel.setPlayerSize(SMALL);
									else dispatch.audioModel.setPlayerSize(MINIMIZED);
								}}
								className="bg-gray-200 hover:bg-gray-100 dark:bg-neutral-900 dark:border-neutral-800 border-gray-400 border rounded-md px-1.5 dark:hover:bg-neutral-700 inline-flex items-center transition-all">
								{playerSize === MINIMIZED ? (
									<i className="fa-solid fa-caret-up text-teal-500 text-xs"></i>
								) : (
									<i className="fa-solid fa-caret-down text-teal-500 text-xs"></i>
								)}
							</button>
						</div>
						{playerSize === MINIMIZED && (
							<Marquee className="w-[200px] mx-2" direction="right" gradient={false}>
								<div className="flex justify-evenly text-xs uppercase gap-x-2">
									<span className="dark:text-gray-400 text-neutral-500">
										{audioData?.isSample
											? audioData?.tapes?.[currentTrack].tape.name
											: audioData?.tapes?.[currentTape]?.tape?.name}
									</span>
									<span className="dark:text-gray-300 text-neutral-600">
										#{audioData?.isSample ? 0 : (currentTrack % 10) + 1}
									</span>
									<span className="dark:text-gray-200 text-neutral-700">
										{audioData?.isSample
											? audioData?.samples?.[currentTrack]?.artist
											: audioData?.tracks?.[currentTape]?.[currentTrack]
												?.artist}
									</span>
								</div>
							</Marquee>
						)}
					</div>
					<div
						className={
							playerSize === MINIMIZED
								? "hidden"
								: "inline-flex justify-between items-center w-screen py-2.5 px-2.5 animate__animated animate__fadeInUp"
						}>
						<div className="flex lg:w-[10%] p-6">
							{audioData?.isSample ? (
								<img
									className="h-full w-full xl:max-h-[4rem] xl:max-w-[4rem] max-h-[4rem] max-w-[4rem] object-fill rounded-sm mr-3"
									src={
										tapeData?.tapes?.[currentTape]?.[currentTapeId]?.tape?.image
									}
								/>
							) : (
								<img
									className="h-full w-full xl:max-h-[4rem] xl:max-w-[4rem] max-h-[4rem] max-w-[4rem] object-fill rounded-sm mr-3"
									src={tapeData?.tapes?.[currentTape]?.[currentTapeId]?.tape?.image}
								/>
							)}
							<TrackDetails />
						</div>
						<div className="flex items-center lg:justify-center justify-end gap-x-2 w-[30%] lg:w-[10%]">
							<button
								disabled={audioData?.isLoading}
								onClick={() => {
									if (audioData?.isSample) {
										dispatch.audioModel.setIsSample(false);
										dispatch.audioModel.setCurrentTrack(0);
									} else {
										let prevTapeId;
										let prevTrack = audioData?.currentTrack - 1;
										let allTapeIds = Object.keys(tapeData?.tapes?.[currentTape]);
										for (let i = 0; i < allTapeIds.length; i++) {
											if (allTapeIds[i] == currentTapeId && allTapeIds?.[i - 1]) prevTapeId = allTapeIds[i - 1];
											if (allTapeIds[i] == currentTapeId && !allTapeIds?.[i - 1]) prevTapeId = allTapeIds[allTapeIds.length - 1];
										}
										if (!prevTapeId) prevTapeId = currentTapeId;
										let currentTrackLength = tapeData?.tracks?.[currentTape]?.[currentTapeId]?.length;
										if (prevTrack >= 0 && prevTrack < currentTrackLength) dispatch.audioModel.setCurrentTrack(prevTrack);
										if (prevTrack < 0) {
											let prevTrackLength = tapeData?.tracks?.[currentTape]?.[prevTapeId]?.length - 1;
											dispatch.audioModel.setCurrentTrack(prevTrackLength);
											if (prevTapeId in tapeData?.tapes?.[audioData?.currentTape]) dispatch.audioModel.setCurrentTapeId(prevTapeId);
											else dispatch.audioModel.setCurrentTapeId(allTapeIds[allTapeIds.length - 1]);
										}
									}
								}}
								className="inline-flex items-center">
								<i className="fa-solid fa-backward-step lg:text-base text-xs text-neutral-900 dark:text-neutral-300"></i>
							</button>
							{audioData?.isLoading && <LoadingIcon />}
							{!audioData?.isPlaying && !audioData?.isLoading && (
								<PlayIcon {...wavesurfer} />
							)}
							{audioData?.isPlaying && !audioData?.isLoading && (
								<PauseIcon {...wavesurfer} />
							)}
							<button
								disabled={audioData?.isLoading}
								onClick={() => {
									if (audioData?.isSample) {
										dispatch.audioModel.setIsSample(false);
										dispatch.audioModel.setCurrentTrack(0);
									} else {
										let nextTapeId;
										let nextTrack = audioData?.currentTrack + 1;
										let allTapeIds = Object.keys(tapeData?.tapes?.[currentTape]);
										for (let i = 0; i < allTapeIds.length; i++) {
											if (allTapeIds[i] == currentTapeId && allTapeIds?.[i + 1]) nextTapeId = allTapeIds[i + 1];
											if (allTapeIds[i] == currentTapeId && !allTapeIds?.[i + 1]) nextTapeId = allTapeIds[0];
										}
										if (!nextTapeId) nextTapeId = currentTapeId;
										let currentTrackLength = tapeData?.tracks?.[currentTape]?.[currentTapeId]?.length;
										if (nextTrack >= 0 && nextTrack < currentTrackLength) dispatch.audioModel.setCurrentTrack(nextTrack);
										if (nextTrack >= currentTrackLength) {
											let nextTrackLength = tapeData?.tracks?.[currentTape]?.[nextTapeId]?.length - 1;
											dispatch.audioModel.setCurrentTrack(nextTrackLength);
											if (nextTapeId in tapeData?.tapes?.[audioData?.currentTape]) dispatch.audioModel.setCurrentTapeId(nextTapeId);
											else dispatch.audioModel.setCurrentTapeId(allTapeIds[0]);
										}
									}
								}}
								className="inline-flex items-center">
								<i className="fa-solid fa-forward-step lg:text-base text-xs text-neutral-900 dark:text-neutral-300"></i>
							</button>
						</div>
						<div
							id="waveform-global"
							className="flex-shrink-0 flex-grow-0 lg:max-w-[70%] lg:w-screen w-[0px] mx-2"
							ref={waveformRef}
						/>
						<div className="lg:w-[3%] flex lg:justify-end">
							<span className="min-w-[4ch] lg:text-sm text-xs text-neutral-900 dark:text-neutral-400">
								{audioData?.currentTime &&
									!audioData?.isLoading &&
									playerSize > HIDDEN &&
									audioData?.currentTime[0]}
							</span>
						</div>
						<div className="lg:w-[3%] flex lg:justify-start">
							<span className="min-w-[4ch] lg:text-sm text-xs text-neutral-700 dark:text-neutral-600">
								{audioData?.duration &&
									!audioData?.isLoading &&
									playerSize > HIDDEN &&
									audioData?.duration[0]}
							</span>
						</div>
					</div>
				</div>
			)}
		</Fragment>
	);
};

export default GlobalAudio;
