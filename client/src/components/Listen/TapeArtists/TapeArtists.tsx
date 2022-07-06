import React, { Fragment } from "react";
import { TapeState } from "../../../models/tapeModel";
import { PlayerSize, TrackMetadata } from "../../../models/common";
import { PlayIcon } from "@heroicons/react/solid";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Dispatch, RootState } from "../../../store";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const TapeArtists = (tapeData: TapeState) => {
	const dispatch = useDispatch<Dispatch>();
	const { id } = useParams<{ id: string }>();
	const audioData = useSelector((state: RootState) => state.audioModel);
	const currentTrack: number = audioData?.currentTrack;

	const playTrack = (no: number) => {
		const currentTrack = (+id - 1) * 10 + no;
		dispatch.audioModel.setPlayerSize(PlayerSize.SMALL);
		dispatch.audioModel.setCurrentTrack(currentTrack);
	};
	return (
		<Fragment>
			{tapeData?.tracks?.length && (
				<div className="col-span-12 lg:col-span-9 bg-neutral-900 border-[0.25px] border-neutral-800 rounded-lg">
					<div className="flex justify-between w-full items-center text-neutral-500 uppercase bg-neutral-900 py-1 px-3 rounded-t-lg mx-auto tracking-wider">
						<div className="text-base">ARTISTS</div>
						<span className="text-[0.65rem] text-neutral-600 italic">click to play</span>
					</div>
					<div className="grid grid-cols-2 xl:grid-cols-5 place-items-center bg-neutral-950 rounded-b-lg gap-y-3 py-5">
						{tapeData.tracks.map((track: TrackMetadata, i: number) => {
							return (
								<div key={track?.artist_img} className="col-span-1 rounded-sm py-4">
									<button
										disabled={audioData?.isLoading}
										onClick={() => playTrack(i)}
										key={track?.artist_img}
										className="flex justify-center items-center group">
										<Fragment>
											{audioData?.tracks?.[currentTrack]?.artist === track?.artist &&
												!audioData?.isLoading &&
												audioData?.duration &&
												audioData?.currentTime && (
													<div className="h-32 w-32 absolute z-50">
														<CircularProgressbar
															styles={buildStyles({
																rotation: 0.25,
																strokeLinecap: "butt",
																textSize: "16px",
																pathTransitionDuration: 0.5,
																textColor: "#f88",
																pathColor: `rgba(192, 37, 211, ${
																	(audioData?.currentTime[1] / audioData?.duration[1]) * 100
																})`,
																trailColor: "#232323",
															})}
															strokeWidth={3}
															value={(audioData?.currentTime[1] / audioData?.duration[1]) * 100}
														/>
													</div>
												)}
											<span className="h-32 w-32 inline-block relative">
												<img
													src={track?.artist_img}
													className={`rounded-full relative z-10 lg:z-50 h-full w-full
														${
															audioData?.tracks?.[currentTrack]?.artist === track?.artist &&
															audioData?.isLoading
																? "animate-pulse"
																: audioData?.tracks?.[currentTrack]?.artist === track?.artist &&
																  !audioData?.isLoading
																? "opacity-50 lg:z-50"
																: "opacity-100"
														}`}
												/>
											</span>
											{!audioData?.isPlaying && audioData?.tracks?.[currentTrack]?.artist !== track?.artist && (
												<PlayIcon
													className="h-6 w-6 text-center text-neutral-200 absolute hidden group-hover:inline z-40 transition-all"
													aria-hidden="true"
												/>
											)}
										</Fragment>
									</button>
									<div className="flex flex-col items-start justify-start mt-3 font-thin">
										<span className="text-left text-neutral-500">#{track?.no}</span>
										<span className="text-left text-neutral-400 text-sm">{track?.artist}</span>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			)}
		</Fragment>
	);
};

export default TapeArtists;
