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
    const trackData = useSelector((state: RootState) => state.tapeModel);
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
                tapeData?.tapes?.[currentTape]?.[currentTapeId]?.sample?.audio
            );
        else
            wavesurfer?.current?.load(
                tapeData?.tracks?.[currentTape]?.[currentTapeId]?.[currentTrack]?.audio
            );
        wavesurfer?.current?.on("audioprocess", (res: number) =>
            dispatch.audioModel.setCurrentTime([`${formatTime(res)}`, res])
        );
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
            let nextTapeId;
            let nextTrack = audioData?.currentTrack + 1;
            let allTapeIds = Object.keys(tapeData?.tapes?.[currentTape]);
            for (let i = 0; i < allTapeIds.length; i++) {
                if (allTapeIds[i] == currentTapeId && allTapeIds?.[i + 1])
                    nextTapeId = allTapeIds[i + 1];
                if (allTapeIds[i] == currentTapeId && !allTapeIds?.[i + 1])
                    nextTapeId = allTapeIds[0];
            }
            if (!nextTapeId) nextTapeId = currentTapeId;
            let currentTrackLength = tapeData?.tracks?.[currentTape]?.[currentTapeId]?.length;
            if (audioData?.isSample) {
                dispatch.audioModel.setIsSample(false);
                dispatch.audioModel.setCurrentTrack(0);
            } else if (nextTrack >= 0 && nextTrack < currentTrackLength)
                dispatch.audioModel.setCurrentTrack(nextTrack);
            else if (nextTrack >= currentTrackLength) {
                dispatch.audioModel.setCurrentTrack(0);
                if (nextTapeId in tapeData?.tapes?.[audioData?.currentTape])
                    dispatch.audioModel.setCurrentTapeId(nextTapeId);
                else dispatch.audioModel.setCurrentTapeId(allTapeIds[0]);
            }
        });
        return () => {
            wavesurfer?.current?.destroy();
        };
    }, [audioData?.currentTrack, audioData?.currentTapeId, audioData?.isSample]);

    return (
        <Fragment>
            {playerSize !== HIDDEN && (
                <div className="bg-neutral-200 dark:bg-neutral-975 animate__animated animate__fadeInUp bottom-0 fixed z-50">
                    <div className="w-screen flex lg:justify-between justify-start gap-x-1 bg-gray-300 dark:bg-neutral-950 dark:border-neutral-900 border-gray-400 border py-1 lg:py-1.5 px-2.5">
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
                                className="bg-gray-200 hover:bg-gray-100 dark:bg-neutral-900 dark:border-neutral-800 border-gray-400 border rounded-md px-2 dark:hover:bg-neutral-700 inline-flex items-center transition-all">
                                <i className="fa-solid fa-xmark text-red-500 text-sm"></i>
                            </button>
                            <button
                                onClick={() => {
                                    if (playerSize === MINIMIZED)
                                        dispatch.audioModel.setPlayerSize(SMALL);
                                    else dispatch.audioModel.setPlayerSize(MINIMIZED);
                                }}
                                className="bg-gray-200 hover:bg-gray-100 dark:bg-neutral-900 dark:border-neutral-800 border-gray-400 border rounded-md px-2 dark:hover:bg-neutral-700 inline-flex items-center transition-all">
                                {playerSize === MINIMIZED ? (
                                    <i className="fa-solid fa-caret-up text-teal-500 text-sm"></i>
                                ) : (
                                    <i className="fa-solid fa-caret-down text-teal-500 text-sm"></i>
                                )}
                            </button>
                            <button
                                disabled={audioData?.isLoading}
                                onClick={() => {
                                    let prevTapeId;
                                    let prevTrack = audioData?.currentTrack - 1;
                                    let allTapeIds = Object.keys(tapeData?.tapes?.[currentTape]);
                                    for (let i = 0; i < allTapeIds.length; i++) {
                                        if (allTapeIds[i] == currentTapeId && allTapeIds?.[i - 1])
                                            prevTapeId = allTapeIds[i - 1];
                                        if (allTapeIds[i] == currentTapeId && !allTapeIds?.[i - 1])
                                            prevTapeId = allTapeIds[allTapeIds.length - 1];
                                    }
                                    if (!prevTapeId) prevTapeId = currentTapeId;
                                    let currentTrackLength =
                                        tapeData?.tracks?.[currentTape]?.[currentTapeId]?.length;
                                    if (audioData?.isSample) {
                                        dispatch.audioModel.setIsSample(false);
                                        dispatch.audioModel.setCurrentTapeId(prevTapeId);
                                        dispatch.audioModel.setCurrentTrack(0);
                                    } else if (
                                        audioData?.currentTrack > 0 &&
                                        prevTrack < currentTrackLength
                                    )
                                        dispatch.audioModel.setCurrentTrack(prevTrack);
                                    else if (audioData?.currentTrack === 0) {
                                        let prevTrackLength =
                                            tapeData?.tracks?.[currentTape]?.[prevTapeId]?.length -
                                            1;
                                        dispatch.audioModel.setCurrentTrack(prevTrackLength);
                                        if (prevTapeId in tapeData?.tapes?.[audioData?.currentTape])
                                            dispatch.audioModel.setCurrentTapeId(prevTapeId);
                                        else
                                            dispatch.audioModel.setCurrentTapeId(
                                                allTapeIds[allTapeIds.length - 1]
                                            );
                                    }
                                }}
                                className="bg-gray-200 hover:bg-gray-100 dark:bg-neutral-900 dark:border-neutral-800 border-gray-400 border rounded-md px-2.5 lg:py-0 py-0.5 dark:hover:bg-neutral-700 inline-flex items-center transition-all">
                                <i className="fa-solid fa-backward-step lg:text-base text-sm text-neutral-900 dark:text-neutral-300"></i>
                            </button>
                            <button className="bg-gray-200 hover:bg-gray-100 dark:bg-neutral-900 dark:border-neutral-800 border-gray-400 border rounded-md px-2 lg:py-0 py-0.5 dark:hover:bg-neutral-700 inline-flex items-center transition-all">
                                {audioData?.isLoading && <LoadingIcon />}
                                {!audioData?.isPlaying && !audioData?.isLoading && (
                                    <PlayIcon {...wavesurfer} />
                                )}
                                {audioData?.isPlaying && !audioData?.isLoading && (
                                    <PauseIcon {...wavesurfer} />
                                )}
                            </button>
                            <button
                                disabled={audioData?.isLoading}
                                onClick={() => {
                                    let nextTapeId;
                                    let nextTrack = audioData?.currentTrack + 1;
                                    let allTapeIds = Object.keys(tapeData?.tapes?.[currentTape]);
                                    for (let i = 0; i < allTapeIds.length; i++) {
                                        if (allTapeIds[i] == currentTapeId && allTapeIds?.[i + 1])
                                            nextTapeId = allTapeIds[i + 1];
                                        if (allTapeIds[i] == currentTapeId && !allTapeIds?.[i + 1])
                                            nextTapeId = allTapeIds[0];
                                    }
                                    if (!nextTapeId) nextTapeId = currentTapeId;
                                    let currentTrackLength =
                                        tapeData?.tracks?.[currentTape]?.[currentTapeId]?.length;
                                    if (audioData?.isSample) {
                                        dispatch.audioModel.setIsSample(false);
                                        dispatch.audioModel.setCurrentTrack(0);
                                    } else if (nextTrack >= 0 && nextTrack < currentTrackLength)
                                        dispatch.audioModel.setCurrentTrack(nextTrack);
                                    else if (nextTrack >= currentTrackLength) {
                                        dispatch.audioModel.setCurrentTrack(0);
                                        if (nextTapeId in tapeData?.tapes?.[audioData?.currentTape])
                                            dispatch.audioModel.setCurrentTapeId(nextTapeId);
                                        else dispatch.audioModel.setCurrentTapeId(allTapeIds[0]);
                                    }
                                }}
                                className="bg-gray-200 hover:bg-gray-100 dark:bg-neutral-900 dark:border-neutral-800 border-gray-400 border rounded-md px-2.5 lg:py-0 py-0.5 dark:hover:bg-neutral-700 inline-flex items-center transition-all">
                                <i className="fa-solid fa-forward-step lg:text-base text-sm text-neutral-900 dark:text-neutral-300"></i>
                            </button>
                        </div>
                        {playerSize === MINIMIZED && (
                            <Marquee
                                className="w-[200px] py-0.5 mx-2"
                                direction="right"
                                gradient={false}>
                                <div className="flex justify-evenly text-xs uppercase gap-x-2">
                                    <span className="dark:text-gray-400 text-neutral-500 px-1">
                                        {audioData?.isSample
                                            ? tapeData?.tapes?.[currentTape]?.[currentTapeId]?.tape
                                                  .name
                                            : tapeData?.tapes?.[currentTape]?.[currentTapeId]?.tape
                                                  ?.name}
                                    </span>
                                    <span className="dark:text-gray-300 text-neutral-600 px-1">
                                        {audioData?.isSample
                                            ? `#0`
                                            : trackData?.tracks?.[currentTape]?.[currentTapeId]?.[
                                                  currentTrack
                                              ]?.title || `#${currentTrack + 1}`}
                                    </span>
                                    <span className="dark:text-gray-200 text-neutral-700 px-1">
                                        {audioData?.isSample
                                            ? tapeData?.tapes?.[currentTape]?.[currentTapeId]
                                                  ?.sample?.artist
                                            : tapeData?.tracks?.[currentTape]?.[currentTapeId]?.[
                                                  currentTrack
                                              ]?.artist}
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
                        <div className="flex lg:max-w-[25%] p-6">
                            <img
                                className="h-full w-full xl:max-h-[4rem] xl:max-w-[4rem] max-h-[4rem] max-w-[4rem] object-fill rounded-sm mr-3"
                                src={tapeData?.tapes?.[currentTape]?.[currentTapeId]?.tape?.image}
                            />
                            <TrackDetails />
                        </div>
                        <div
                            id="waveform-global"
                            className="flex-shrink-0 flex-grow-0 lg:max-w-[60%] xl:max-w-[65%] lg:w-screen w-[0px] mx-2"
                            ref={waveformRef}
                        />
                        <div className="lg:max-w-[10%] flex items-center gap-x-1 px-6">
                            <div className="flex lg:justify-end">
                                <span className="min-w-[4ch] lg:text-sm text-xs text-neutral-900 dark:text-neutral-400">
                                    {audioData?.currentTime &&
                                        !audioData?.isLoading &&
                                        playerSize > HIDDEN &&
                                        audioData?.currentTime[0]}
                                </span>
                            </div>
                            <div className="flex lg:justify-start">
                                <span className="min-w-[4ch] lg:text-sm text-xs text-neutral-700 dark:text-neutral-600">
                                    {audioData?.duration &&
                                        !audioData?.isLoading &&
                                        playerSize > HIDDEN &&
                                        audioData?.duration[0]}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    );
};

export default GlobalAudio;
