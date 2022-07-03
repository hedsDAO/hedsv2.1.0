import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, Dispatch } from "../../../store";
import { PlayerSize, TrackMetadata } from "../../../models/common";

const RightAudioControls = (wavesurfer: React.MutableRefObject<WaveSurfer | null | undefined>) => {
	const dispatch = useDispatch<Dispatch>();
	const audioData = useSelector((state: RootState) => state.audioModel);
	const currentTrack: number = useSelector((state: RootState) => state.audioModel?.currentTrack);
	const tracks: Array<TrackMetadata> = useSelector((state: RootState) => state.audioModel?.tracks);
	return (
		<div className="inline-flex items-center justify-center px-2">
			<div
				className={`${
					audioData?.playerSize === PlayerSize.LARGE ? "h-96" : "h-52"
				} bottom-0 relative flex flex-col items-center justify-between text-center ml-auto py-2 lg:py-3 px-3`}>
				<button
					disabled={audioData?.isLoading}
					onClick={() => {
						if (audioData?.playerSize === PlayerSize.LARGE) dispatch.audioModel.setPlayerSize(audioData?.playerSize - 1);
						if (audioData?.playerSize < PlayerSize.LARGE) dispatch.audioModel.setPlayerSize(PlayerSize.LARGE);
					}}
					className="text-center transition-all">
					<i
						className={`fa-solid fa-angle-up text-neutral-300 ${
							audioData?.playerSize > PlayerSize.MEDIUM ? "rotate-180" : "rotate-0"
						}`}
					/>
				</button>
				<button disabled={audioData?.isLoading} onClick={() => wavesurfer?.current?.skipForward(5)} className="text-center">
					<i className="fa-solid fa-rotate-right text-neutral-300"></i>
				</button>
				<button
					disabled={audioData?.isLoading}
					onClick={() => {
						if (tracks?.[currentTrack + 1]) dispatch.audioModel.setCurrentTrack(currentTrack + 1);
						else dispatch.audioModel.setCurrentTrack(0);
					}}
					className="text-center">
					<i className="fa-solid fa-forward text-neutral-300"></i>
				</button>
			</div>
		</div>
	);
};

export default RightAudioControls;
