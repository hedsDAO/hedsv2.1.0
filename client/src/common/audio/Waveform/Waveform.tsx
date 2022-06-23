// @ts-nocheck
import React, { useEffect, useRef, useState } from "react";
import { PlayIcon } from "@heroicons/react/solid";
import ReactLoading from "react-loading";
import WaveSurfer from "wavesurfer.js";
import { isMobile } from "react-device-detect";
import { toggleFullScreen } from "../../../utils/toggleFullScreen";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

const formWaveSurferOptions = (ref: HTMLVideoElement, hex: string) => ({
	container: ref,
	waveColor: "#242424",
	progressColor: hex || "#f59e0b",
	cursorColor: "transparent",
	barWidth: 6,
	barRadius: 2,
	responsive: true,
	height: 70,
	hideScrollbar: true,
	backend: "MediaElement",
});
const Waveform = ({ url, selectedTrack, tapeData }: any) => {
	const globalTapeData = useSelector((state: RootState) => state.globalTapesModel);
	const waveformRef = useRef<HTMLDivElement>();
	const wavesurfer = useRef<any>(null);
	const videoRef = useRef<HTMLVideoElement>(null);
	const [isFirstLoad, setIsFirstLoad] = useState(true);
	const [playing, setPlay] = useState(false);
	const [volume, setVolume] = useState(1);
	const [loading, setLoading] = useState(false);
	const [isMaxVideoHeight, setIsMaxVideoHeight] = useState<boolean>(false);
	useEffect(() => {
		setPlay(false);
		const options = formWaveSurferOptions(waveformRef.current, tapeData?.hex);
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
			}
		});
		return () => {
			wavesurfer.current.destroy();
		};
	}, [selectedTrack, url]);

	const handlePlayPause = () => {
		setIsFirstLoad(false);
		setPlay(!playing);
		wavesurfer.current.playPause();
	};
	return (
		<>
			{tapeData && tapeData.tracks.length && (
				<>
					<div className="flex items-center sm:justify-start justify-center mr-2">
						<img
							className="h-6 w-6 ring-1 ring-neutral-400 rounded-full my-auto mr-3 p-0.5"
							src={tapeData?.tracks[parseInt(selectedTrack)]?.image}
						/>
						<div className="flex justify-start text-xs font-extralight tracking-widest uppercase text-neutral-100 pt-5">
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
								{tapeData?.tracks[parseInt(selectedTrack)]?.title}
							</p>
						</div>
					</div>
					<div className="flex items-center px-1 justify-between my-3">
						<div className={`flex flex-col items-start  mt-3 hover:text-amber-500 mb-2`}>
							<div className="flex items-center flex-col w-2/12 lg:w-1/12 mx-auto">
								<div className="flex items-center justify-center">
									<button disabled={loading} onClick={handlePlayPause} className="">
										{playing || loading ? (
											<ReactLoading
												className="w-12 h-12 rounded-full"
												type={"bars"}
												color={"#242424"}
												height={"56"}
												width={"56"}
											/>
										) : (
											<PlayIcon
												className={`h-12 w-12 sm:w-14 sm:h-14 text-center text-${tapeData?.color}-500 
												z-40 group-hover:text-amber-900 transition-all ease-in-out duration-200 mt-0.5`}
												aria-hidden="true"
											/>
										)}
									</button>
								</div>
							</div>
						</div>
						<div id="waveform" className="w-10/12 md:w-10/12 lg:w-11/12 mt-2" ref={waveformRef} />
					</div>
					<div key={url + tapeData.name} className="flex flex-col items-end">
						<video
							poster={tapeData?.assets?.cover}
							key={tapeData?.name}
							ref={videoRef}
							key={url}
							playsInline
							id="full-screenVideo"
							className={`z-20 bg-neutral-800 relative mx-auto w-full h-full ${
								!isMaxVideoHeight && "sm:max-h-60"
							} transition-all object-center object-cover mt-5`}
							src={url}
						/>
						<div>
							{!isMobile && (
								<button className="ml-3" onClick={() => setIsMaxVideoHeight(!isMaxVideoHeight)}>
									<i className="fa-light fa-arrows-from-line text-neutral-400 mt-4"></i>
								</button>
							)}
							<button className="ml-3" onClick={() => toggleFullScreen()}>
								<i className="fa-solid fa-expand text-neutral-400 mt-4"></i>
							</button>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default Waveform;
