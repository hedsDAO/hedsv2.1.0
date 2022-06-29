import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { TrackMetadata } from "../../models/audioModel";
import { RootState, Dispatch } from "../../store";
import TapeTimeline from "../../common/steps/TapeTimeline/TapeTimeline";
import { calculateTapeVP } from "../../utils/calculateTapeVP";
import GhostLoader from "../../common/wrappers/GhostLoader/GhostLoader";
import axios from "axios";
import { PauseIcon, PlayIcon } from "@heroicons/react/solid";
import { DownloadIcon } from "@heroicons/react/outline";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

import profileTestImg from "../../../../public/2.png";
import "react-circular-progressbar/dist/styles.css";

const headers = { Accept: "application/json", "X-API-KEY": "96f93b237cd14aafbda92f6d5cbf49ca" };

const HedsTapes = () => {
	const { space, tape, id } = useParams<{ space?: string; tape: string; id: string }>();
	const dispatch = useDispatch<Dispatch>();
	const [collectionStats, setCollectionStats] = useState<any>();
	const globalTapesData = useSelector((state: RootState) => state.globalTapesModel);
	const globalAudioData = useSelector((state: RootState) => state.globalAudioModel);
	const audioData = useSelector((state: RootState) => state.audioModel);
	const currentTapeData = audioData?.allTapes[+id - 1];
	const globalTapeData = globalTapesData?.hedstapes?.[parseInt(id) - 1];
	const getCollectionStats = async (collection: string) => {
		setCollectionStats(
			await axios.get(`https://api.opensea.io/api/v1/collection/${collection}/stats`, { headers }).then((res) => res.data)
		);
	};
	useEffect(() => {
		getCollectionStats(`hedstape-${id}`);
	}, []);

	useEffect(() => {
		const query = { space: space || "heds", tape: tape, id: id };
		if (globalTapeData) dispatch.audioModel.getAudioData([query, globalTapeData]);
	}, [globalTapeData]);

	const playTrack = (no: number) => {
		if (globalAudioData?.trackDetails?.track?.audio === audioData?.allAudio?.[+id - 1]?.[no]?.audio && globalAudioData?.currentTime) {
			dispatch.globalAudioModel?.setIsPlaying(true);
		} else {
			dispatch?.audioModel?.getAllAudio("heds");
			const track = audioData?.allAudio?.[+id - 1]?.[no];
			const tape = audioData?.allTapes?.[+id - 1];
			if (track && tape) {
				dispatch.globalAudioModel.getGlobalAudio([track, tape, space]);
			}
		}
	};

	return (
		<GhostLoader>
			{globalTapeData && audioData && (
				<>
					<div className="w-screen lg:mt-2 mt-11 mb-40">
						<div className={`lg:pb-0 lg:z-10 lg:relative py-3 lg:py-10 bg-neutral-950 mb-10 max-w-[100rem] mx-auto rounded-lg`}>
							<div className="lg:max-w-6xl lg:px-1 lg:grid lg:grid-cols-5 lg:gap-2 lg:mx-auto lg:my-20">
								<div className="flex justify-center lg:col-span-2 lg:-my-20 px-2 lg:py-5 py-4">
									<div className="flex flex-col items-center">
										<img src={globalTapeData?.image} className={`object-contain rounded-lg w-full shadow-sm`} />
									</div>
								</div>
								<div className="mt-2 lg:col-span-3">
									<div className="mx-auto max-w-md px-10 sm:max-w-2xl lg:py-8 lg:max-w-none">
										<div className="flex flex-col md:justify-start justify-center">
											<div className="mt-4 lg:mt-0 text-3xl font-thin font-serif text-neutral-300 text-center md:text-left">
												<span className="rounded-sm py-0.5">{globalTapeData?.name}</span>
											</div>
											<div className="lg:px-0 px-10 lg:py-2 py-1.5 bg-opacity-60 text-neutral-400 text-sm mt-2 text-center md:text-left">
												Thanks to its blend of production diversity and understated, casual bangers, hedsTAPE 04
												introduced a completely new curation process. HT04 expands the scope of what is possible
												with decentralized curation, with an infusion of jazz vocals and from the multi platinum
												instrumentalist, Masego. Using a beloved base melody, the "Howl's Moving Castle" theme, as a
												launching point, the sample for this tape utilizes stacked harmonies, a thoughtful take on
												the classic, and a modern twist on universally applicable lyrics.
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					{/* <hr className="border-neutral-800 border-[0.25px] mx-12 px-4 my-4" /> */}

					<div className="flex justify-center items-center ">
						<h3 className="text-lg leading-6 tracking-widest font-medium text-neutral-300 mb-3">THE SAMPLE</h3>
					</div>
					<div className="grid grid-cols-12 gap-x-2 max-w-lg mx-auto mt-2 px-4 py-3 sm:p-6 bg-neutral-950 sm:rounded-lg mb-5">
						<div className="col-span-5 flex flex-col items-center justify-center">
							<div className="my-2">
								<img
									src={globalTapeData?.sample?.image}
									className="w-32 h-32 mx-auto p-0.5 transition-all ease-in-out rounded-full"
								/>
							</div>
						</div>
						<div className="col-span-7 flex flex-col items-center justify-center">
							<div className="flex items-center justify-between w-full bg-neutral-850 text-neutral-400 uppercase px-2 py-1.5 rounded-lg">
								<span className="ml-1">artist</span>
								<span className="bg-neutral-900 text-sm text-neutral-300 px-2.5 py-0.5 rounded-md">
									{globalTapeData?.sample?.artist}
								</span>
							</div>
							<div className="flex items-center justify-between w-full bg-neutral-850 text-neutral-400 uppercase px-2 py-1.5 rounded-lg mt-2">
								<span className="ml-1">bpm</span>
								<span className="bg-neutral-900 text-sm text-neutral-300 px-2.5 py-0.5 rounded-md">
									{globalTapeData?.sample?.bpm}
								</span>
							</div>
							<div className="flex items-center justify-between w-full bg-neutral-850 text-neutral-400 uppercase px-2 py-1.5 rounded-lg mt-2">
								<span className="ml-1">download</span>
								<button className="bg-neutral-900 text-sm text-neutral-300 px-2.5 py-0.5 rounded-md">
									<DownloadIcon className="h-4 w-4 text-center text-neutral-300 z-40 transition-all" aria-hidden="true" />
								</button>
							</div>
						</div>
					</div>
					<>
						<TapeTimeline />
						<div className="grid grid-cols-12 mx-auto gap-x-3 px-5 max-w-[93rem] pt-2 pb-32">
							<div className="bg-neutral-950 sm:rounded-lg rounded-sm col-span-12 lg:col-span-3 lg:py-2 py-8 my-2 lg:my-0">
								<div className="flex flex-col w-full justify-center items-center mt-8">
									<div className="flex -space-x-2 overflow-hidden mb-4">
										<img src={globalTapeData?.sample?.image} className="h-20 w-20 inline-block rounded-full" />
										<img src={profileTestImg} className="h-20 w-20 inline-block rounded-full" />
									</div>
									<span className="text-neutral-500 mt-2 text-sm font-thin">CURATED BY</span>
									<span className="text-neutral-200 text-lg mt-1 font-thin uppercase tracking-widest">
										{globalTapeData?.sample?.artist} x Heds
									</span>
								</div>
								<hr className="border-neutral-800 border-[0.25px] mx-12 px-4 my-4" />
								{collectionStats?.stats?.count > 0 && (
									<div className="flex flex-col justify-center items-center mt-3 px-10">
										<div className="flex items-center justify-between w-full bg-neutral-850 text-neutral-400 uppercase px-2 py-1.5 rounded-lg">
											<span className="ml-1"> VOTING POWER</span>
											<span className="bg-neutral-900 text-sm text-neutral-300 px-2.5 py-0.5 rounded-md">
												{calculateTapeVP([collectionStats?.stats?.num_owners, collectionStats?.stats?.count])}
											</span>
										</div>
									</div>
								)}
								{collectionStats?.stats?.count > 0 && (
									<div className="flex flex-col justify-center items-center mt-2 px-10">
										<div className="flex items-center justify-between w-full bg-neutral-850 text-neutral-400 uppercase px-2 py-1.5 rounded-lg">
											<span className="ml-1">MINTED</span>
											<span className="bg-neutral-900 text-sm text-neutral-300 px-2.5 py-0.5 rounded-md">
												{collectionStats?.stats?.count}
											</span>
										</div>
									</div>
								)}
								{collectionStats?.stats?.num_owners > 0 && (
									<div className="flex flex-col justify-center items-center mt-2 px-10">
										<div className="flex items-center justify-between w-full bg-neutral-850 text-neutral-400 uppercase px-2 py-1.5 rounded-lg">
											<span className="ml-1">OWNERS</span>
											<span className="bg-neutral-900 text-sm text-neutral-300 px-2.5 py-0.5 rounded-md">
												{collectionStats?.stats?.num_owners}
											</span>
										</div>
									</div>
								)}
								{collectionStats?.stats?.total_volume > 0 && (
									<div className="flex flex-col justify-center items-center mt-2 px-10">
										<div className="flex items-center justify-between w-full bg-neutral-850 text-neutral-400 uppercase px-2 py-1.5 rounded-lg">
											<span className="ml-1"> TOTAL VOLUME</span>
											<span className="bg-neutral-900 text-sm text-neutral-300 px-2.5 py-0.5 rounded-md">
												{(collectionStats?.stats?.total_volume).toFixed(2)} ETH
											</span>
										</div>
									</div>
								)}
							</div>
							<div className="col-span-9 bg-neutral-950 sm:rounded-lg p-6">
								<div className="flex flex-col gap-y-1">
									<div className={`grid grid-cols-10 gap-1`}>
										{audioData?.allAudio?.[+id - 1]?.length ? (
											audioData?.allAudio?.[+id - 1]?.map((track: TrackMetadata, i: number) => {
												return (
													<div key={track?.artist_img} className="xl:col-span-2 col-span-5 rounded-sm">
														<div className="w-32 h-32 mx-auto my-4 rounded-full">
															{globalAudioData?.trackDetails?.track?.audio === track?.audio &&
															globalAudioData?.currentTime?.length &&
															globalAudioData?.duration?.length ? (
																<div className="group">
																	<CircularProgressbar
																		styles={buildStyles({
																			rotation: 0.25,
																			strokeLinecap: "butt",
																			textSize: "16px",
																			pathTransitionDuration: 0.5,
																			textColor: "#f88",
																			pathColor: `rgba(192, 37, 211, ${
																				(globalAudioData?.currentTime[1] /
																					globalAudioData?.duration[1]) *
																				100
																			})`,
																			trailColor: "#232323",
																		})}
																		strokeWidth={3}
																		value={
																			(globalAudioData?.currentTime[1] /
																				globalAudioData?.duration[1]) *
																			100
																		}
																	/>
																	<img
																		src={track?.artist_img}
																		className={`w-32 h-32 mx-auto p-0.5 relative -mt-32 opacity-50 transition-all ease-in-out ${
																			globalAudioData?.isPlaying ? "imageRounding" : "rounded-sm"
																		}
																	}`}
																	/>
																	{globalAudioData?.isPlaying ? (
																		<PauseIcon
																			onClick={() => dispatch.globalAudioModel?.setIsPlaying(false)}
																			className="h-6 w-6 text-center text-neutral-300 relative hidden group-hover:inline z-40 -mt-[9.75rem] ml-[3.3rem] transition-all"
																			aria-hidden="true"
																		/>
																	) : (
																		<PlayIcon
																			onClick={() => dispatch.globalAudioModel?.setIsPlaying(true)}
																			className="h-6 w-6 text-center text-neutral-300 relative hidden group-hover:inline z-40 -mt-[9.75rem] ml-[3.3rem] transition-all"
																			aria-hidden="true"
																		/>
																	)}
																</div>
															) : (
																<button
																	disabled={globalAudioData?.isLoading}
																	onClick={() => playTrack(i)}
																	key={track?.artist_img}
																	className="flex justify-center items-center group my-4">
																	{globalAudioData?.isLoading &&
																	globalAudioData?.trackDetails?.track?.audio === track?.audio ? (
																		<img
																			src={track?.artist_img}
																			className={`w-32 h-32 mx-auto p-0.5 group-hover:opacity-50 transition-all animate-pulse ${
																				globalAudioData?.isPlaying ? "imageRounding" : "rounded-sm"
																			}`}
																		/>
																	) : (
																		<>
																			<img
																				src={track?.artist_img}
																				className={`w-32 h-32 mx-auto p-0.5 group-hover:opacity-50 transition-all rounded-sm `}
																			/>
																			<PlayIcon
																				className="h-6 w-6 text-center text-neutral-200 absolute hidden group-hover:inline z-40 transition-all"
																				aria-hidden="true"
																			/>
																		</>
																	)}
																</button>
															)}
														</div>
														<div className="flex flex-col font-sans items-center justify-center text-neutral-400 text-center p-2 rounded-sm">
															<span className="text-xs mr-1">
																<span className="mr-0.5">#</span>
																{track?.no}
															</span>
															<span className="text-sm">{track?.artist}</span>
														</div>
													</div>
												);
											})
										) : (
											<div className="text-neutral-400"> curation in progress</div>
										)}
									</div>
								</div>
							</div>
						</div>
					</>
				</>
			)}
		</GhostLoader>
	);
};
export default HedsTapes;
