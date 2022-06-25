import React, { useEffect, useState, useRef } from "react";
import { RootState, Dispatch } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import { PlayIcon } from "@heroicons/react/solid";
import ReactLoading from "react-loading";
import WaveSurfer from "wavesurfer.js";

const formWaveSurferOptions = (ref: any) => ({
	container: ref,
	waveColor: "#eee",
	progressColor: "#f59e0b",
	cursorColor: "transparent",
	barWidth: 3,
	barRadius: 2,
	responsive: true,
	height: 15,
	hideScrollbar: true,
});

const GlobalAudio = () => {
	const dispatch = useDispatch<Dispatch>();
	const globalAudioData = useSelector((state: RootState) => state.globalAudioModel);
	const waveformRef = useRef(null);
	const wavesurfer = useRef<any>(null);
	const [volume, setVolume] = useState<number>(1);

	useEffect(() => {
		dispatch.globalAudioModel.setIsPlaying(false);
		dispatch.globalAudioModel.setIsLoading(true);
		const options = formWaveSurferOptions(waveformRef.current);
		wavesurfer.current = WaveSurfer.create(options);
		wavesurfer.current.load(globalAudioData?.trackDetails?.track?.audio);
		wavesurfer.current.on("waveform-ready", () => dispatch.globalAudioModel.setIsLoading(false));
		wavesurfer.current.on("ready", function () {
			if (wavesurfer.current) {
				dispatch.globalAudioModel.setIsLoading(false);
				wavesurfer?.current?.setVolume(volume);
				setVolume(volume);
			}
		});
		wavesurfer.current.on("finish", () => {});
		return () => wavesurfer.current.destroy();
	}, [globalAudioData?.trackDetails]);

	const handlePlayPause = () => {
		const current = globalAudioData?.isPlaying;
		dispatch.globalAudioModel.setIsPlaying(!current);
		wavesurfer.current.playPause();
	};
	return (
		<div className="bottom-0 fixed z-50">
			{globalAudioData && (
				<div className="bg-neutral-950 border-t-[0.25px] border-neutral-600 w-screen">
					<div className="">
						<div className="grid grid-cols-12 items-center">
							<div className="col-span-7 sm:col-span-2 lg:col-span-1 gap-1">
								<div className="flex justify-between">
									<div className="flex items-center">
										<img src={globalAudioData?.trackDetails?.tape?.tape_img} className="max-h-[5em] p-3" />
										<div className="flex flex-col justify-center">
											<span className="text-neutral-300 inline-flex items-baseline lg:text-base whitespace-nowrap">
												<span className="inline-flex items-center px-2 text-sm font-medium text-neutral-400">
													{globalAudioData?.trackDetails?.tape?.name}
												</span>
											</span>
											<span className="text-neutral-300 inline-flex items-baseline lg:text-base whitespace-nowrap">
												<span className="inline-flex items-center px-2 text-sm font-medium text-neutral-400">
													{globalAudioData?.trackDetails?.track?.artist}
												</span>
											</span>
											<span className="text-neutral-300 inline-flex items-baseline lg:text-base whitespace-nowrap">
												<span className="inline-flex items-center px-2 text-sm font-medium text-neutral-400">
													{globalAudioData?.trackDetails?.track?.no}
												</span>
											</span>
										</div>
									</div>
									<button disabled={globalAudioData?.isLoading} onClick={handlePlayPause} className="mr-2">
										{globalAudioData?.isPlaying || globalAudioData?.isLoading ? (
											<ReactLoading
												className="h-10 w-10 my-auto rounded-full"
												type={"bars"}
												color={"#f59e0b"}
												height={"32"}
												width={"32"}
											/>
										) : (
											<PlayIcon
												className="w-10 h-10 text-center text-amber-500 z-40 group-hover:text-amber-900 transition-all ease-in-out duration-200"
												aria-hidden="true"
											/>
										)}
									</button>
								</div>
							</div>
							<div className="col-span-5 sm:col-span-10 lg:col-span-11 mx-2">
								<div id="waveform" className="" ref={waveformRef} />
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default GlobalAudio;
