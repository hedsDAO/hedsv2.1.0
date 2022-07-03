import React from "react";
import { AudioState } from "../../../models/audioModel";

interface TrackDetailsProps {
	audioData: AudioState;
	currentTape: number;
	currentTrack: number;
}

const TrackDetails = ({ audioData, currentTape, currentTrack }: TrackDetailsProps) => {
	return (
		<div className="flex flex-col items-start justify-center px-5 animate__animated animate__fadeInUp">
			<span className="text-neutral-300 text-base lg:text-lg font-base whitespace-nowrap">
				{audioData?.tapes[currentTape]?.tape?.name}
			</span>
			<span className="text-neutral-400 text-sm lg:text-base font-thin">#{(currentTrack % 10) + 1}</span>
			<span className="text-neutral-500 text-xs lg:text-sm font-extralight whitespace-nowrap">
				{audioData?.tracks[currentTrack].artist}
			</span>
		</div>
	);
};

export default TrackDetails;
