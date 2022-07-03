import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, Dispatch } from "../../../store";
import { PlayerSize, TrackMetadata } from "../../../models/common";
import LoadingIcon from "../../../common/svg/LoadingIcon/LoadingIcon";
import PlayIcon from "../../../common/svg/PlayIcon/PlayIcon";
import PauseIcon from "../../../common/svg/PauseIcon/PauseIcon";

const LeftAudioControls = (wavesurfer: React.MutableRefObject<WaveSurfer | null | undefined>) => {
	const dispatch = useDispatch<Dispatch>();
	const audioData = useSelector((state: RootState) => state.audioModel);
	const currentTrack: number = useSelector((state: RootState) => state.audioModel?.currentTrack);
	const tracks: Array<TrackMetadata> = useSelector((state: RootState) => state.audioModel?.tracks);
	return (
		<div className={`inline-flex justify-center items-center px-2`}>
			<div
				className={`${
					audioData?.playerSize === PlayerSize.LARGE ? "h-96" : "h-52"
				} bottom-0 relative flex flex-col items-center justify-between text-center mr-auto py-2 lg:py-3 px-3`}>
				<button
					disabled={audioData?.isLoading}
					onClick={() => {
						if (audioData?.playerSize < PlayerSize.MEDIUM && wavesurfer?.current)
							dispatch.audioModel.setPlayerSize(PlayerSize.MEDIUM);
						wavesurfer?.current?.toggleInteraction();
						if (audioData?.playerSize > PlayerSize.SMALL && wavesurfer?.current)
							dispatch.audioModel.setPlayerSize(PlayerSize.SMALL);
						wavesurfer?.current?.toggleInteraction();
					}}
					className="text-center">
					<i
						className={`fa-solid fa-angle-right text-neutral-300 ${
							audioData?.playerSize > PlayerSize.SMALL ? "rotate-180" : "rotate-0"
						}`}
					/>
				</button>
				<button disabled={audioData?.isLoading} onClick={() => {}} className="text-center">
					{audioData?.isLoading && <LoadingIcon />}
					{!audioData?.isPlaying && !audioData?.isLoading && <PlayIcon {...wavesurfer} />}
					{audioData?.isPlaying && !audioData?.isLoading && <PauseIcon {...wavesurfer} />}
				</button>
				<button
					disabled={audioData?.isLoading}
					onClick={() => {
						if (tracks?.[currentTrack - 1]) dispatch.audioModel.setCurrentTrack(currentTrack - 1);
						else dispatch.audioModel.setCurrentTrack(tracks.length - 1);
					}}
					className="text-center">
					<i className="fa-solid fa-backward text-neutral-300"></i>
				</button>
			</div>
		</div>
	);
};

export default LeftAudioControls;
