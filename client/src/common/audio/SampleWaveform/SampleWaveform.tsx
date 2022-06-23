// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import { PlayIcon, ChevronDoubleRightIcon, ChevronDoubleLeftIcon } from "@heroicons/react/solid";
import { toggleFullScreen } from "../../../utils/toggleFullScreen";
import ReactLoading from "react-loading";
import { isMobile } from "react-device-detect";
import WaveSurfer from "wavesurfer.js";

const formWaveSurferOptions = (ref) => ({
	container: ref,
	waveColor: "#eee",
	progressColor: "#f59e0b",
	cursorColor: "transparent",
	barWidth: 6,
	barRadius: 2,
	responsive: true,
	height: 70,
	hideScrollbar: true,
	backend: "MediaElement",
});

const formatTimestamp = (time: any) => {
	const roundedNum = Math.round(time);
	const minutes = Math.round(roundedNum / 60);
	let seconds = roundedNum - minutes * 60;
	const fullTime = `${minutes + seconds / 100}`.replace(".", ":");
	return fullTime;
};

const SampleWaveform = ({ url, selectedTrack, globalTapeData }) => {
	const waveformRef = useRef(null);
	const wavesurfer = useRef(null);
	const videoRef = useRef(null);
	const [isFirstLoad, setIsFirstLoad] = useState(true);
	const [playing, setPlay] = useState(false);
	const [volume, setVolume] = useState(1);
	const [loading, setLoading] = useState(false);
	const [duration, setDuration] = useState(0);
	const [currentTime, setCurrentTime] = useState(0);
	const [isMaxVideoHeight, setIsMaxVideoHeight] = useState<boolean>(false);

	useEffect(() => {
		setPlay(false);
		const options = formWaveSurferOptions(waveformRef.current);
		wavesurfer.current = WaveSurfer.create(options);
		wavesurfer.current.load(videoRef.current);
		setLoading(true);
		wavesurfer.current.on("waveform-ready", () => {
			setLoading(false);
		});
		wavesurfer.current.on("ready", function () {
			if (wavesurfer.current) {
				wavesurfer.current.setVolume(volume);
				setVolume(volume);
				let time = wavesurfer.current.getDuration();
				setDuration(formatTimestamp(time));
			}
		});
		wavesurfer.current.on("audioprocess", () => {
			if (wavesurfer.current) {
				let current = Math.round(wavesurfer.current.getCurrentTime());
				setCurrentTime(formatTimestamp(current));
			}
		});
		return () => {
			videoRef.current?.load(url);
			wavesurfer.current.destroy();
		};
	}, [selectedTrack, url]);

	const handlePlayPause = () => {
		setIsFirstLoad(false);
		setPlay(!playing);
		wavesurfer.current.playPause();
	};

	const onVolumeChange = (e) => {
		const { target } = e;
		const newVolume = +target.value;
		if (newVolume) {
			setVolume(newVolume);
			wavesurfer.current.setVolume(newVolume || 1);
		}
	};

	return (
		<div className="lg:px-0 md:px-3 px-5">
			<div className="flex text-amber-500 my-4 hover:text-amber-500 px-2">
				<img className="h-10 w-10 ring-1 ring-neutral-300 rounded-full my-auto mr-3" src={globalTapeData.sample.image} />
				<div className="text-xs font-extralight tracking-widest uppercase text-neutral-100">
					{playing ? (
						<div className="animate__animated animate__fadeInUp absolute -mt-2">NOW PLAYING</div>
					) : isFirstLoad ? (
						<></>
					) : (
						<div className="animate__animated animate__fadeOutDown absolute -mt-2">NOW PLAYING</div>
					)}
					{!playing ? (
						<div className="animate__animated animate__fadeInUp absolute -mt-2">QUEUED</div>
					) : isFirstLoad ? (
						<></>
					) : (
						<div className="animate__animated animate__fadeOutDown absolute -mt-2">QUEUED</div>
					)}
					<p className="text-sm font-bold tracking-widest text-amber-500 uppercase group-hover:text-gray-200 ease-in-out duration-300 mt-2">
						{globalTapeData.sample.artist}
					</p>
				</div>
			</div>
			<div className="grid grid-cols-12 items-center">
				<div className="col-span-2 sm:col-span-1">
					<button disabled={loading} onClick={handlePlayPause} className="">
						{playing || loading ? (
							<ReactLoading
								className="w-8 h-8 mb-4 my-auto rounded-full mx-3"
								type={"bars"}
								color={"#f59e0b"}
								height={"44"}
								width={"44"}
							/>
						) : (
							<PlayIcon
								className="mb-4 w-10 h-10  sm:w-14 sm:h-14 text-center text-amber-500 z-40 group-hover:text-amber-900 transition-all ease-in-out duration-200 mx-0.5"
								aria-hidden="true"
							/>
						)}
					</button>
				</div>
				<div className="col-span-10 sm:col-span-11 mb-5">
					<div id="waveform" className="" ref={waveformRef} />
				</div>
			</div>
			<video
				poster={globalTapeData.image}
				type="video/mp4"
				id="full-screenVideo"
				key={selectedTrack}
				ref={videoRef}
				playsInline
				className={`z-20 relative mx-auto w-full h-full ${
					!isMaxVideoHeight && "sm:max-h-60"
				} transition-all object-center object-cover mt-5`}
				src={url}
			/>
			<div>
				{!isMobile && (
					<>
						<button className="ml-3" onClick={() => setIsMaxVideoHeight(!isMaxVideoHeight)}>
							<i className="fa-light fa-arrows-from-line text-neutral-400 mt-4"></i>
						</button>
						<button className="ml-3" onClick={() => toggleFullScreen()}>
							<i className="fa-solid fa-expand text-neutral-400 mt-4"></i>
						</button>
					</>
				)}
			</div>
		</div>
	);
};

export default SampleWaveform;
