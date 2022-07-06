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
		<div className={audioData?.isLoading ? `inline-flex justify-center items-center px-2.5 py-1` : `inline-flex justify-center items-center px-2 py-1`}>
			<div
				className={`${
					audioData?.playerSize === PlayerSize.LARGE
						? "h-96 bottom-0 relative flex flex-col items-center justify-between text-center lg:mr-auto py-2 px-3"
						: audioData?.playerSize === PlayerSize.MEDIUM
						? "h-52 bottom-0 relative flex flex-col items-center justify-between text-center lg:mr-auto py-2 px-3"
						: "h-52 bottom-0 relative flex flex-col items-center justify-between text-center -ml-1.5 lg:-ml-0 lg:mr-auto py-2 px-3"
				}`}>
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
				{audioData?.playerSize > PlayerSize.SMALL ? (
					<button
						disabled={audioData?.isLoading}
						onClick={() => {
							if (tracks?.[currentTrack - 1]) dispatch.audioModel.setCurrentTrack(currentTrack - 1);
							else dispatch.audioModel.setCurrentTrack(tracks.length - 1);
						}}
						className="text-center">
						<i className="fa-solid fa-backward text-neutral-300"></i>
					</button>
				) : (
					<button
						disabled={audioData?.isLoading}
						onClick={() => {
							dispatch.audioModel.setAudioOff({
								playerSize: PlayerSize.HIDDEN,
								isPlaying: false,
							});
						}}
						className="text-center">
						<i className="fa-solid fa-xmark text-neutral-300"></i>
					</button>
				)}
			</div>
		</div>
	);
};

export default LeftAudioControls;
