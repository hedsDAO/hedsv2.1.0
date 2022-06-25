import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { TrackMetadata } from "../../models/audioModel";
import { RootState, Dispatch } from "../../store";
import axios from "axios";

const headers = { Accept: "application/json", "X-API-KEY": "96f93b237cd14aafbda92f6d5cbf49ca" };

const HedsTapes = () => {
	const { space, tape, id } = useParams<{ space?: string; tape: string; id: string }>();
	const dispatch = useDispatch<Dispatch>();
	const [collectionStats, setCollectionStats] = useState<any>();
	const globalTapesData = useSelector((state: RootState) => state.globalTapesModel);
	const tapeData = useSelector((state: RootState) => state.tapesModel);
	const audioData = useSelector((state: RootState) => state.audioModel);
	const globalTapeData = globalTapesData?.hedstapes?.[parseInt(id) - 1];
	const getCollectionStats = async (collection: string) => {
		setCollectionStats(
			await axios.get(`https://api.opensea.io/api/v1/collection/${collection}/stats`, { headers }).then((res) => res.data)
		);
	};
	useEffect(() => {
		getCollectionStats(`hedstape-${id}`);
		if (!tapeData?.id) dispatch.tapesModel.getTapeData(id);
		if (tapeData?.id !== id + 1) dispatch.tapesModel.getTapeData(id);
	}, []);

	useEffect(() => {
		const query = { space: space || "heds", tape: tape, id: id };
		if (globalTapeData) dispatch.audioModel.getAudioData([query, globalTapeData]);
	}, [globalTapeData]);

	useEffect(() => {
		console.log(collectionStats);
	}, [collectionStats]);

	const playTrack = (no: number) => {
		const track = audioData.audio.track?.[no];
		const tape = audioData.audio.tape;
		dispatch.globalAudioModel.getGlobalAudio([track, tape, space]);
	};
	console.log(collectionStats, "col");
	return (
		<>
			{globalTapeData && audioData && (
				<div className="w-screen md:mt-16 mt-11 pb-56">
					<div className={`lg:pb-0 lg:z-10 lg:relative py-3 lg:py-5`}>
						<div className="lg:max-w-7xl lg:px-6 lg:grid lg:grid-cols-5 lg:gap-2 lg:mx-auto ">
							<div className="flex justify-center lg:col-span-2 lg:-my-20 px-2 lg:py-5 py-4">
								<div className="flex flex-col items-center">
									<img
										src={globalTapeData?.image}
										className={`object-contain bg-neutral-900 border-${globalTapeData?.color}-900 border-2 p-1 rounded-full sm:max-w-sm shadow-sm`}
									/>
								</div>
							</div>
							<div className="mt-2 lg:col-span-3">
								<div className="mx-auto max-w-md px-2 sm:max-w-2xl lg:py-8 lg:max-w-none">
									<div className="flex flex-col md:justify-start justify-center">
										<div className="mt-4 lg:mt-0 text-3xl font-thin font-serif text-neutral-300 text-center md:text-left">
											<span className="rounded-sm py-0.5">hedsTAPE 06</span>
										</div>
										<div className="lg:py-2 py-1.5 bg-opacity-60 text-neutral-400 mt-2 text-center md:text-left md:px-0 px-3">
											Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
											labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
											laboris nisi ut aliquip ex ea commodo consequat.
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="grid grid-cols-12 lg:mt-20 pt-10 max-w-6xl mx-auto gap-x-4 px-10">
						<div className="bg-neutral-950 border border-neutral-600 h-[200px] col-span-12 lg:col-span-3">
							<div className="flex flex-col w-full justify-center items-center my-8">
								<img src={globalTapeData?.sample?.image} className="h-20 w-20 rounded-full" />
								<span className="text-neutral-500 mt-2 text-sm">SAMPLED FROM</span>
								<span className="text-neutral-300 mt-1">{globalTapeData?.sample?.artist}</span>
							</div>
						</div>
						<div className="col-span-12 lg:col-span-9">
							<div className="flex flex-col gap-y-2">
								<div className="grid grid-cols-12 gap-x-2 bg-neutral-800 border border-neutral-600 p-1">
									<div className="col-span-1 text-neutral-300 font-thin uppercase my-auto text-center">#</div>
									<div className="col-span-1 text-neutral-300 font-thin uppercase my-auto">ARTISTS</div>
								</div>
								{audioData?.audio?.track?.length &&
									audioData.audio.track.map((track: TrackMetadata, i: number) => {
										return (
											<div
												onClick={() => playTrack(i)}
												className="grid grid-cols-12 gap-x-2 hover:bg-neutral-800 bg-neutral-950 border border-neutral-600 items-center justify-items-stretch py-0.5 transition-all">
												<div className="col-span-1 text-sm uppercase text-neutral-300 font-thin ml-1 text-center">
													{i + 1}
												</div>
												<div className="col-span-11 text-neutral-300 font-thin uppercase mx-1">{track?.artist}</div>
											</div>
										);
									})}
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};
export default HedsTapes;
