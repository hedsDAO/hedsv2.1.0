//ts-ignore
import React, { useState, useEffect, useRef } from "react";
import { Dispatch } from "../../../store";
import { useDispatch } from "react-redux";
import AudioControls from "../AudioControls/AudioControls";
import WaveSurfer from "wavesurfer.js";
import { AudioPlayerProps } from "../../../models/common";

/*
 * Read the blog post here:
 * https://letsbuildui.dev/articles/building-an-audio-player-with-react-hooks
 */

const formWaveSurferOptions = (ref: HTMLElement) => ({
	container: ref,
	waveColor: "#a3a3a3",
	progressColor: "#f59e0b",
	cursorColor: "transparent",
	barWidth: 2,
	barRadius: 0,
	responsive: true,
	height: 100,
	hideScrollbar: true,
	// backend: "MediaElement"
});

const AudioPlayer = ({ tracks, selectedTrack }: AudioPlayerProps) => {
	// State
	const dispatch = useDispatch<Dispatch>();
	const [isPlaying, setIsPlaying] = useState(false);
	const waveformRef = useRef<any>(null);
	const wavesurfer = useRef<any>(null);

	// Destructure for conciseness
	const { subId, link } = tracks[selectedTrack];

	// Refs
	const firstMount = useRef(false);

	const toPrevTrack = () => {
		if (selectedTrack - 1 < 0) {
			dispatch.voteModel.setSelectedTrack(0);
		} else {
			dispatch.voteModel.setSelectedTrack(selectedTrack - 1);
		}
	};

	const toNextTrack = () => {
		if (selectedTrack < tracks.length - 1) {
			dispatch.voteModel.setSelectedTrack(selectedTrack + 1);
		} else {
			dispatch.voteModel.setSelectedTrack(0);
		}
	};

	const formatSubId = (words: string): string => {
		const splitWords = words.split(" ");
		let first = splitWords[0]?.toLowerCase();
		let second = splitWords[1]?.toUpperCase();
		return first + second;
	};

	useEffect(() => {
		const options = formWaveSurferOptions(waveformRef.current);
		wavesurfer.current = WaveSurfer.create(options);
		wavesurfer.current.load(link);
		wavesurfer.current.on("waveform-ready", () => {});
		wavesurfer.current.on("ready", function () {
			if (wavesurfer.current) {
				wavesurfer?.current?.setVolume(1);
				if (firstMount.current) {
					setIsPlaying(true);
					wavesurfer.current.play();
				}
			}
		});
		wavesurfer.current.on("finish", () => {
			setTimeout(() => {
				if (tracks?.[selectedTrack + 1]) {
					dispatch.voteModel.setSelectedTrack(selectedTrack + 1);
					firstMount.current = true;
				} else {
					dispatch.voteModel.setSelectedTrack(0);
					firstMount.current = false;
				}
			}, 750);
		});
		return () => {
			setIsPlaying(false);
			wavesurfer.current.destroy();
		};
	}, [selectedTrack, link]);

	useEffect(() => {
		if (isPlaying) {
			wavesurfer.current.play();
		} else {
			wavesurfer.current.pause();
		}
	}, [isPlaying]);

	// Handles cleanup and setup when changing tracks
	useEffect(() => {
		setIsPlaying(false);
		if (isPlaying) {
			wavesurfer.current.pause();
		}
	}, [selectedTrack]);

	useEffect(() => {
		// Pause and clean up on unmount
		return () => {
			wavesurfer.current.pause();
		};
	}, []);

	useEffect(() => {
		if (selectedTrack) {
			dispatch.voteModel.setSelectedTrack(selectedTrack);
		}
	}, [selectedTrack]);

	return (
		<div className="bg-neutral-900 px-5 pt-2 pb-4 mb-2 rounded-md">
			{/* <h2 className="text-md font-thin mb-2 text-amber-500 mx-2">{formatSubId(subId)}</h2> */}
			<div className="flex items-center md:justify-start justify-center w-12/12 md:w-1/12 sm:mx-4 ml-0.5">
				<div className="flex md:justify-start justify-center items-center text-xs font-extralight tracking-widest text-neutral-100">
					{isPlaying ? (
						<div className="animate__animated animate__fadeInUp absolute -mt-2">NOW PLAYING</div>
					) : firstMount ? (
						<></>
					) : (
						<div className="animate__animated animate__fadeOutDown absolute -mt-2">NOW PLAYING</div>
					)}
					{!isPlaying ? (
						<div className="animate__animated animate__fadeInUp absolute -mt-2">QUEUED</div>
					) : firstMount ? (
						<></>
					) : (
						<div className="animate__animated animate__fadeOutDown absolute -mt-2">QUEUED</div>
					)}
					<p className="text-sm font-bold tracking-widest text-amber-500 group-hover:text-gray-200 ease-in-out duration-300 pt-10 whitespace-nowrap">
						{formatSubId(subId)}
					</p>
				</div>
			</div>
			<div className="audio-player flex flex-col sm:flex-row items-center justify-center mb-6 sm:mb-10 mt-4 sm:mt-2">
				<div className="w-12/12 md:w-1/12 mx-1 flex flex-col justify-center items-center">
					<AudioControls
						isPlaying={isPlaying}
						onPrevClick={toPrevTrack}
						onNextClick={toNextTrack}
						onPlayPauseClick={setIsPlaying}
					/>
				</div>
				<div className="w-12/12 md:w-11/12 w-full flex-1 sm:mt-0 mt-6">
					<div id="waveform" className="mx-2" ref={waveformRef} />
				</div>
			</div>
		</div>
	);
};

export default AudioPlayer;
