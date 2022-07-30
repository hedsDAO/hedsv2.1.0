import React from "react";
import { Link } from "react-router-dom";
import { AudioState } from "../../../models/audioModel";

interface TrackDetailsProps {
	audioData: AudioState;
	currentTape: number;
	currentTrack: number;
}

const TrackDetails = ({ audioData, currentTape, currentTrack }: TrackDetailsProps) => {
	return (
		<div className="flex flex-col items-start justify-center px-6 animate__animated animate__fadeIn animate__fast">
			<span className="text-neutral-900 dark:text-neutral-300 text-sm md:text-base lg:text-lg font-base whitespace-nowrap">
				<Link to={audioData?.tapes[currentTape - 1]?.links?.route}>
					{audioData?.isSample ? audioData?.tapes[currentTrack].tape.name : audioData?.tapes[currentTape - 1]?.tape?.name}
				</Link>
			</span>
			<span className="text-neutral-800 dark:text-neutral-400 text-sm lg:text-base font-thin">#{audioData?.isSample ? 0 : (currentTrack % 10) + 1}</span>
			<span className="text-neutral-700 dark:text-neutral-500 text-xs lg:text-sm font-extralight whitespace-nowrap">
				{audioData?.isSample ? audioData?.samples[currentTrack]?.artist : audioData?.tracks[currentTrack].artist}
			</span>
		</div>
	);
};

export default TrackDetails;
