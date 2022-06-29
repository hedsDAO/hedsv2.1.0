import React, { useEffect, useState, useRef } from "react";
import { RootState, Dispatch } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import { PlayIcon, PauseIcon } from "@heroicons/react/solid";
import WaveSurfer from "wavesurfer.js";
import { formatTime } from "../../utils/formatTime";

const formWaveSurferOptions = (ref: any) => ({
	container: ref,
	waveColor: "#282828",
	progressColor: "#C025D3",
	cursorColor: "transparent",
	barWidth: 0.5,
	barRadius: 0.5,
	responsive: true,
	height: 110,
	hideScrollbar: true,
	backend: "MediaElement",
});
const GlobalAudio = () => {
	const [isExpanded, setIsExpanded] = useState<boolean>(true);
	const dispatch = useDispatch<Dispatch>();
	const globalAudioData = useSelector((state: RootState) => state.globalAudioModel);
	const audioData = useSelector((state: RootState) => state.audioModel);
	const waveformRef = useRef<HTMLDivElement>(null);
	const videoRef = useRef<HTMLVideoElement>(null);
	const wavesurfer = useRef<any>(null);
	const [volume, setVolume] = useState<number>(1);

	useEffect(() => {
		dispatch.globalAudioModel.setIsPlaying(false);
		dispatch.globalAudioModel.setIsLoading(true);
		const options = formWaveSurferOptions(waveformRef.current);
		// @ts-ignore
		wavesurfer.current = WaveSurfer.create(options);
		wavesurfer.current.load(videoRef.current);
		wavesurfer.current.on("audioprocess", (res: number) => dispatch.globalAudioModel.setCurrentTime([formatTime(res), res]));
		wavesurfer.current.on("ready", function () {
			if (wavesurfer.current) {
				dispatch.globalAudioModel.setDuration([formatTime(wavesurfer?.current?.getDuration()), wavesurfer?.current?.getDuration()]);
				wavesurfer?.current?.setVolume(volume);
				setVolume(volume);
			}
		});
		wavesurfer.current.on("waveform-ready", () => {
			dispatch.globalAudioModel.setIsLoading(false);
			dispatch.globalAudioModel.setIsPlaying(true);
			wavesurfer.current.playPause();
		});
		wavesurfer.current.on("finish", function () {
			const { trackDetails } = globalAudioData;
			console.log(trackDetails, trackDetails?.track.no, trackDetails?.tape?.no, audioData?.allAudio, "debug 1");
			if (trackDetails && trackDetails?.track.no && trackDetails?.tape?.no && audioData?.allAudio) {
				let currentTrack = +trackDetails?.track?.no;
				const currentTape = trackDetails?.tape?.no;
				if (currentTrack === 10) {
					if (+currentTape >= 5) {
						const track = audioData?.allAudio?.[0]?.[0];
						const tape = audioData?.allTapes?.[0];
						console.log(track, tape, "debug 3 - end of tapes");
						if (tape && track) dispatch.globalAudioModel.getGlobalAudio([track, tape, "heds"]);
					} else {
						const track = audioData?.allAudio?.[+currentTape]?.[0];
						const tape = audioData?.allTapes?.[+currentTape];
						if (tape && track) dispatch.globalAudioModel.getGlobalAudio([track, tape, "heds"]);
					}
				} else {
					const track = audioData?.allAudio?.[+currentTape - 1]?.[currentTrack];
					const tape = audioData?.allTapes?.[+currentTape - 1];
					if (tape && track) dispatch.globalAudioModel.getGlobalAudio([track, tape, "heds"]);
					console.log(track, tape, "debug 5 - new song");
				}
			}
		});
		return () => wavesurfer.current.destroy();
	}, [globalAudioData?.trackDetails?.track?.video]);

	const handlePlayPause = () => {
		const current = globalAudioData?.isPlaying;
		dispatch.globalAudioModel.setIsPlaying(!current);
		wavesurfer.current.playPause();
	};

	const nextTrack = () => {
		const { trackDetails } = globalAudioData;

		if (trackDetails && trackDetails?.track.no && trackDetails?.tape?.no && audioData?.allAudio) {
			let currentTrack = +trackDetails?.track?.no;
			const currentTape = trackDetails?.tape?.no;
			if (currentTrack === 10) {
				if (+currentTape >= 5) {
					const track = audioData?.allAudio?.[0]?.[0];
					const tape = audioData?.allTapes?.[0];

					if (tape && track) dispatch.globalAudioModel.getGlobalAudio([track, tape, "heds"]);
				} else {
					const track = audioData?.allAudio?.[+currentTape]?.[0];
					const tape = audioData?.allTapes?.[+currentTape];
					if (tape && track) dispatch.globalAudioModel.getGlobalAudio([track, tape, "heds"]);
				}
			} else {
				const track = audioData?.allAudio?.[+currentTape - 1]?.[currentTrack];
				const tape = audioData?.allTapes?.[+currentTape - 1];
				if (tape && track) dispatch.globalAudioModel.getGlobalAudio([track, tape, "heds"]);
			}
		}
	};

	const prevTrack = () => {
		const { trackDetails } = globalAudioData;
		if (trackDetails && trackDetails?.track.no && trackDetails?.tape?.no && audioData?.allAudio) {
			let currentTrack = +trackDetails?.track?.no;
			const currentTape = trackDetails?.tape?.no;
			if (currentTrack === 10) {
				if (+currentTape >= 5) {
					const track = audioData?.allAudio?.[0]?.[0];
					const tape = audioData?.allTapes?.[0];

					if (tape && track) dispatch.globalAudioModel.getGlobalAudio([track, tape, "heds"]);
				} else {
					const track = audioData?.allAudio?.[+currentTape]?.[0];
					const tape = audioData?.allTapes?.[+currentTape];
					if (tape && track) dispatch.globalAudioModel.getGlobalAudio([track, tape, "heds"]);
				}
			} else {
				const track = audioData?.allAudio?.[+currentTape - 1]?.[currentTrack];
				const tape = audioData?.allTapes?.[+currentTape - 1];
				if (tape && track) dispatch.globalAudioModel.getGlobalAudio([track, tape, "heds"]);
			}
		}
	};

	useEffect(() => {
		if (wavesurfer?.current?.isPlaying() !== globalAudioData?.isPlaying && globalAudioData?.currentTime) {
			wavesurfer.current.playPause();
		}
	}, [globalAudioData?.isPlaying]);

	return (
		<div className={isExpanded ? "bottom-0 fixed z-50" : `bottom-0 fixed z-50`}>
			{globalAudioData && (
				<div className={`w-screen"`}>
					{isExpanded && (
						<div className="inline-flex items-center p-2 animate__animated animate__fadeInLeft">
							<div className={"h-44 bottom-0 relative flex flex-col items-center justify-between text-center py-3.5 px-3.5"}>
								{/* <i className={"fa-solid fa-angle-up text-neutral-300"} /> */}
								<i className="fa-solid fa-angle-right text-neutral-300 px-2"></i>
								<button disabled={globalAudioData?.isLoading} onClick={handlePlayPause} className="text-center">
									{globalAudioData?.isLoading && !globalAudioData?.isPlaying ? (
										<svg
											role="status"
											className="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-neutral-900"
											viewBox="0 0 100 101"
											fill="none"
											xmlns="http://www.w3.org/2000/svg">
											<path
												d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
												fill="currentColor"
											/>
											<path
												d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
												fill="currentFill"
											/>
										</svg>
									) : globalAudioData?.isPlaying ? (
										<PauseIcon
											className="h-5 w-5 text-center text-neutral-300 z-40 group-hover:text-fuchsia-900 transition-all ease-in-out duration-200"
											aria-hidden="true"
										/>
									) : (
										<PlayIcon
											className="h-5 w-5 text-center text-neutral-300 z-40 group-hover:text-fuchsia-900 transition-all ease-in-out duration-200 animate__animated animate__fadeIn"
											aria-hidden="true"
										/>
									)}
								</button>
							</div>
							<video
								key={globalAudioData?.trackDetails?.track?.video}
								ref={videoRef}
								src={globalAudioData?.trackDetails?.track?.video}
								poster={globalAudioData?.trackDetails?.tape?.image}
								className={
									globalAudioData?.isPlaying && !globalAudioData?.isLoading
										? "max-h-[10rem] lg:max-h-[6em] xl:max-h-[10em] md:p-3 animate__animated animate__fadeInUp"
										: globalAudioData?.isLoading
										? "max-h-1 opacity-0 -mb-20"
										: "max-h-[10rem] lg:max-h-[6em] xl:max-h-[10em] md:p-3 animate__animated animate__fadeOutDown"
								}
							/>
						</div>
					)}
					<div
						className={isExpanded ? "hidden" : "w-full h-44 flex  sm:justify-stretch justify-between items-center ease-in-out"}>
						<div
							className={
								isExpanded ? "hidden" : "md:w-[5%] lg:w-[2.5%] h-full flex flex-col items-center justify-between py-5 px-4"
							}>
							<i className={isExpanded ? "hidden" : "fa-solid fa-angle-up text-neutral-300 px-2.5"} />
							{globalAudioData?.isLoading && !globalAudioData?.isPlaying ? (
								<i className="fas fa-circle-notch fa-spin text-white"></i>
							) : globalAudioData?.isPlaying ? (
								<button disabled={globalAudioData?.isLoading} onClick={handlePlayPause} className="px-1">
									<PauseIcon
										className="h-6 w-6 text-center text-neutral-300 z-40 group-hover:text-fuchsia-900 transition-all ease-in-out duration-200"
										aria-hidden="true"
									/>
								</button>
							) : (
								<button disabled={globalAudioData?.isLoading} onClick={handlePlayPause} className="px-1">
									<PlayIcon
										className="h-6 w-6 text-center text-neutral-300 z-40 group-hover:text-fuchsia-900 transition-all ease-in-out duration-200 animate__animated animate__fadeIn"
										aria-hidden="true"
									/>
								</button>
							)}
							<i className="fa-solid fa-backward-fast text-neutral-300 text-center mx-auto"></i>
						</div>
						{/* <div className={isExpanded ? "hidden" : "lg:w-[6%]"}>
							<video
								key={globalAudioData?.trackDetails?.track?.video}
								ref={videoRef}
								src={globalAudioData?.trackDetails?.track?.video}
								poster={globalAudioData?.trackDetails?.tape?.image}
								className={
									isExpanded
										? "max-h-[20vh] xl:max-h-[40vh] p-5 md:p-10 mx-1.5"
										: "max-h-[6em] xl:max-h-[12em] p-1 md:p-3 mx-1.5"
								}
							/>
						</div> */}
						<div className="lg:w-[8%] px-4">
							<div className="flex flex-col justify-center">
								<span className="text-neutral-300 inline-flex items-baseline lg:text-base overflow-ellipsis whitespace-nowrap">
									<span className="inline-flex items-center lg:px-2 text-xs sm:text-xl font-medium text-neutral-400">
										{globalAudioData?.trackDetails?.tape?.name}
									</span>
								</span>
								<span className="text-neutral-300 inline-flex items-baseline lg:text-base whitespace-nowrap">
									<span className="inline-flex items-center lg:px-2 text-neutral-400">
										<span className="mr-1">
											<i className="fa-thin fa-hashtag"></i>
										</span>
										{globalAudioData?.trackDetails?.track?.no}
									</span>
								</span>
								<span className="text-neutral-300 inline-flex items-baseline lg:text-base whitespace-nowrap">
									<span className="inline-flex items-center lg:px-2 text-xs sm:text-sm font-thin text-neutral-400">
										{globalAudioData?.trackDetails?.track?.artist}
									</span>
								</span>
							</div>
						</div>
						<div className={isExpanded ? "" : "lg:w-[2%] text-neutral-400"}>
							<span>{globalAudioData?.currentTime?.[0]}</span>
						</div>
						<div className={isExpanded ? "hidden" : "lg:min-w-[70%]"}>
							<div id="waveform" className={isExpanded ? "lg:min-w-[70%]" : "opacity-0 absolute -z-50"} ref={waveformRef} />
						</div>
						<div className={isExpanded ? "hidden" : "lg:w-[2%] text-neutral-400"}>
							<span>{globalAudioData?.duration?.[0]}</span>
						</div>
						<div className="md:w-[5%] lg:w-[2.5%] h-full flex flex-col items-end justify-between py-5 px-4">
							<i onClick={() => setIsExpanded(!isExpanded)} className="fa-solid fa-angle-left text-neutral-300 px-2"></i>
							<i className={isExpanded ? "hidden" : "fa-solid fa-forward-fast text-neutral-300 px-2"}></i>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default GlobalAudio;
