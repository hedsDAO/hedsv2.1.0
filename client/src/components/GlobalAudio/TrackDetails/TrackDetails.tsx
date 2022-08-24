import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../../store";

const TrackDetails = () => {
    const { currentTape, currentTrack, currentTapeId, isSample } = useSelector((state: RootState) => state.audioModel);
    const trackData = useSelector((state: RootState) => state.tapeModel);
    const spaceData = useSelector((state: RootState) => state.spaceModel);
    return (
        <div className="flex flex-col items-start justify-center animate__animated animate__fadeIn animate__fast">
            {trackData?.tracks && spaceData && (
                <>
                    <span className="text-neutral-800 dark:text-neutral-300 text-sm lg:text-xs font-base whitespace-nowrap">
                        {trackData?.tapes?.[currentTape]?.[currentTapeId] && (
                            <Link to={trackData?.tapes?.[currentTape]?.[currentTapeId]?.links?.route}>
                                {isSample
                                    ? trackData?.tapes?.[currentTape]?.[currentTapeId]?.tape.name
                                    : trackData?.tapes?.[currentTape]?.[currentTapeId]?.tape?.name}
                            </Link>
                        )}
                    </span>
                    <span className="text-neutral-800 dark:text-neutral-400 text-sm lg:text-sm font-thin">
                        #{spaceData?.isSample ? 0 : (currentTrack)}
                    </span>
                    <span className="text-neutral-700 dark:text-neutral-500 text-xs lg:text-sm font-extralight whitespace-nowrap">
                        {isSample ? trackData?.tapes?.[currentTape]?.[currentTrack]?.sample?.artist : trackData?.tracks?.[currentTape]?.[currentTapeId]?.[currentTrack]?.artist}
                    </span>
                </>
            )}
        </div>
    );
};

export default TrackDetails;
