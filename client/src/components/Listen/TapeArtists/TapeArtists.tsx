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
	const currentTape: number = Math.floor(audioData?.currentTrack / 10 + 1);
	const playTrack = (no: number) => {
		const currentTrack = (+id - 1) * 10 + no;
		dispatch.audioModel.setPlayerSize(PlayerSize.SMALL);
		dispatch.audioModel.setCurrentTrack(currentTrack);
	};
	console.log(currentTape, currentTrack % 10);
	return (
		<Fragment>
			{tapeData?.tracks?.length && (
				<div className="col-span-12 lg:col-span-9 bg-neutral-950 border-[0.25px] border-neutral-800 sm:rounded-lg mt-5 lg:mt-0">
					<div className="flex flex-col gap-6 p-2">
						<div className="grid grid-cols-10 gap-2">
							{tapeData.tracks.map((track: TrackMetadata, i: number) => {
								return (
									<div key={track?.artist_img} className="xl:col-span-2 col-span-5 rounded-sm">
										<div className="w-full h-full mx-auto rounded-full">
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
														)}
													<img
														src={track?.artist_img}
														className={`
														${
															audioData?.tracks?.[currentTrack]?.artist === track?.artist &&
															audioData?.isLoading
																? "animate-pulse"
																: audioData?.tracks?.[currentTrack]?.artist === track?.artist &&
																  !audioData?.isLoading
																? "imageRounding opacity-50 absolute z-50 -mb-32"
																: "group-hover:opacity-50"
														}
														 w-52 h-52 mx-auto p-0.5 transition-all rounded-lg`}
													/>
													{!audioData?.isPlaying &&
														audioData?.tracks?.[currentTrack]?.artist !== track?.artist && (
															<PlayIcon
																className="h-6 w-6 text-center text-neutral-200 absolute hidden group-hover:inline z-40 transition-all"
																aria-hidden="true"
															/>
														)}
												</Fragment>
											</button>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			)}
		</Fragment>
	);
};

export default TapeArtists;
