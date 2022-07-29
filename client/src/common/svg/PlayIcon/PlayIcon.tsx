import React from "react";
import { Dispatch, RootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { PlayIcon as Play } from "@heroicons/react/solid";

const PlayIcon = (wavesurfer: React.MutableRefObject<any>) => {
	const dispatch = useDispatch<Dispatch>();
	const audioData = useSelector((state: RootState) => state.audioModel);
	const handlePausePlay = () => {
		const current = audioData?.isPlaying;
		wavesurfer.current.playPause();
		dispatch.audioModel.setIsPlaying(!current);
	};
	return (
		<Play
			onClick={handlePausePlay}
			className="h-5 w-5 text-center text-neutral-900 dark:text-neutral-300 z-40 group-hover:text-fuchsia-900 transition-all ease-in-out duration-200 animate__animated animate__fadeIn"
			aria-hidden="true"
		/>
	);
};

export default PlayIcon;
