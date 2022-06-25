import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { TrackMetadata } from "../../models/audioModel";
import { RootState, Dispatch } from "../../store";

const HedsTapes = () => {
	const { space, tape, id } = useParams<{ space?: string; tape: string; id: string }>();
	const dispatch = useDispatch<Dispatch>();
	const globalTapesData = useSelector((state: RootState) => state.globalTapesModel);
	const tapeData = useSelector((state: RootState) => state.tapesModel);
	const audioData = useSelector((state: RootState) => state.audioModel);
	const globalTapeData = globalTapesData?.hedstapes?.[parseInt(id) - 1];
	useEffect(() => {
		if (!tapeData?.id) dispatch.tapesModel.getTapeData(id);
		if (tapeData?.id !== id + 1) dispatch.tapesModel.getTapeData(id);
	}, []);

	useEffect(() => {
		const query = { space: space || "heds", tape: tape, id: id };
		if (globalTapeData) dispatch.audioModel.getAudioData([query, globalTapeData]);
	}, [globalTapeData]);

	const playTrack = (no: number) => {
		const track = audioData.audio.track?.[no];
		const tape = audioData.audio.tape;
		dispatch.globalAudioModel.getGlobalAudio([track, tape, space]);
	};
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
					<div className="grid grid-cols-12 mt-20 pt-10 max-w-7xl mx-auto gap-x-4">
						<div className="bg-neutral-850 border border-neutral-600 h-[200px] col-span-3"></div>
						<div className="col-span-9">
							<div className="flex flex-col gap-y-2">
								<div className="grid grid-cols-12 gap-x-2 bg-neutral-800 border border-neutral-600 p-1">
									<div className="col-span-3 text-neutral-300 font-thin uppercase my-auto mx-1">ARTISTS</div>
								</div>
								{audioData?.audio?.track?.length &&
									audioData.audio.track.map((track: TrackMetadata, i: number) => {
										return (
											<div className="grid grid-cols-12 gap-x-2 bg-neutral-950 border border-neutral-600 p-1">
												<div onClick={() => playTrack(i)} className="col-span-1">
													<img className="object-contain p-1 h-8" src={track?.artist_img} />
												</div>
												<div className="text-neutral-300 font-thin uppercase my-auto col-span-11 text-right mx-1">
													{track?.artist}
												</div>
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
