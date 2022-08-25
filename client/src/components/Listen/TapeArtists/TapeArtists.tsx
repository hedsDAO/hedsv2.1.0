import React, { Fragment } from "react";
import { PlayerSize, TrackMetadata } from "../../../models/common";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Dispatch, RootState } from "../../../store";
import { formatTime } from "../../../utils/formatTime";
import "react-circular-progressbar/dist/styles.css";

const TapeArtists = (trackData: [TrackMetadata]) => {
	const dispatch = useDispatch<Dispatch>();
	const { tape, id } = useParams<{ tape: string; id: string }>();
	const spaceData = useSelector((state: RootState) => state.spaceModel);
	const tapeLength = spaceData?.[tape]?.[+id]?.tape?.tracks;
	const tapeData = useSelector((state: RootState) => state.tapeModel);
	const { currentTrack, currentTape, currentTapeId, isLoading } = useSelector((state: RootState) => state.audioModel);
	const playTrack = (no: number) => {
		dispatch.audioModel.setIsSample(false);
		dispatch.audioModel.setCurrentTrack(no);
		dispatch.audioModel.setCurrentTape(tape);
		dispatch.audioModel.setCurrentTapeId(id);
		dispatch.audioModel.setPlayerSize(PlayerSize.SMALL);
	};
	return (
		<div className="w-full mx-auto">
			{trackData && tapeData && (
				<Fragment>
					<div className="w-full bg-gray-300 dark:bg-neutral-975 rounded-lg xl:rounded-xl mx-auto">
						<div className="grid grid-cols-12 place-items-center rounded-md gap-y-1 pb-1 pt-1 mx-1">
							<div className="col-span-12 grid grid-cols-12 mx-2 w-full px-1 items-start">
								<div className="col-span-1">
									<span className="text-neutral-700 dark:text-neutral-500 text-sm px-1">#</span>
								</div>
								<div className="col-span-6 text-left">
									<span className="text-neutral-700 dark:text-neutral-500 text-sm px-1">ARTIST</span>
								</div>
								<div className="col-span-5 text-right">
									<span className="text-neutral-700 dark:text-neutral-500 text-sm px-1">
										<i className="fa-light fa-clock"></i>
									</span>
								</div>
							</div>
							{Object.values(trackData)?.length
								? Object.values(trackData).map((track: TrackMetadata, i: number) => {
									return (
										<div
											onClick={() => playTrack(i)}
											key={track?.profilePicture}
											className={
												tapeData?.tracks?.[currentTape]?.[currentTapeId]?.[currentTrack]?.audio === track.audio && !isLoading
													? "col-span-12 bg-gray-100 hover:bg-neutral-200 dark:bg-neutral-950 dark:hover:bg-neutral-900 transition-all grid grid-cols-12 py-1.5 w-full px-1.5 rounded-md"
													: "col-span-12 bg-gray-200 hover:bg-neutral-100 dark:bg-neutral-900 dark:hover:bg-neutral-950 transition-all grid grid-cols-12 py-1.5 w-full px-1.5 rounded-md"
											}>
											<div className="text-neutral-800 dark:text-neutral-500 col-span-1 font-thin px-1">{i + 1}</div>
											<div className="col-span-6 inline-flex items-center justify-start gap-x-4 uppercase text-sm tracking-widest text-neutral-800 dark:text-neutral-500 px-1 whitespace-nowrap">
												<img className="h-6 w-6 rounded-full" src={track?.profilePicture} />
												{track?.artist}
											</div>
											<div className="text-neutral-800 dark:text-neutral-500 font-thin uppercase tracking-widest col-span-5 ml-auto text-sm inline-flex items-center justify-end px-1 min-w-[4.5ch] max-w-[4.5ch]">
												{formatTime(track.duration)}
											</div>
										</div>
									);
								})
								: // @ts-ignore
								Array.apply(null, Array(tapeLength)).map((el: any, index: number) => {
									return (
										<div
											key={"empty tape" + index}
											className="col-span-12 bg-neutral-200 dark:bg-neutral-900 transition-all grid grid-cols-12 py-1.5 w-full px-2 rounded-md">
											<div className="col-span-1 font-thin text-neutral-600 text-xs px-1">{index + 1}</div>
											<div className="col-span-6 inline-flex items-center justify-start gap-x-4 uppercase text-xs tracking-widest text-neutral-600 whitespace-nowrap px-1">
												open
											</div>
											<div className="text-neutral-500 font-thin uppercase tracking-widest col-span-5 ml-auto px-1 text-sm inline-flex items-center">
												0:00
											</div>
										</div>
									);
								})}
						</div>
					</div>
				</Fragment>
			)}
		</div>
	);
};

export default TapeArtists;
