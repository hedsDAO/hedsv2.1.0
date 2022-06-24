import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { RootState, Dispatch } from "../../store";
import { Link } from "react-router-dom";
import Timeline from "../../components/TapeTimeline/Timeline";
import DateCountdown from "../../common/countdown/Countdown";
import Playlist from "../../common/audio/Playlist/Playlist";
import Waveform from "../../common/audio/Waveform/Waveform";
import SampleArtistBadge from "../../common/badges/SampleArtistBadge/SampleArtistBadge";
import IconLinkButton from "../../common/buttons/IconLinkButton/IconLinkButton";
import SampleWaveform from "../../common/audio/SampleWaveform/SampleWaveform";

const HedsTapes = () => {
	const { id } = useParams<{ space?: string; tape: string; id: string }>();
	const [selectedTrack, setSelectedTrack] = useState<string>("0");
	const dispatch = useDispatch<Dispatch>();
	const globalTapesData = useSelector((state: RootState) => state.globalTapesModel);
	const tapeData = useSelector((state: RootState) => state.tapesModel);
	const globalTapeData = globalTapesData?.hedstapes?.[parseInt(id) - 1];
	useEffect(() => {
		if (!tapeData?.id) dispatch.tapesModel.getTapeData(id);
		if (tapeData?.id !== id + 1) dispatch.tapesModel.getTapeData(id);
	}, []);

	const playTrack = () => {
		dispatch.globalAudioModel.setGlobalTrack({
			src: tapeData?.tracks?.[0]?.url
		})
	}
	return (
		<>
			{globalTapeData && (
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
											labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
											nisi ut aliquip ex ea commodo consequat.
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="lg:max-w-2xl mx-auto mt-32">
						<div className="flex flex-col gap-y-2">
							{tapeData?.tracks?.length &&
								tapeData.tracks?.map((track: any) => {
									return (
										<div className="grid grid-cols-12 gap-x-2 bg-neutral-950 border border-neutral-600 p-3">
											<div onClick={() => playTrack()} className="col-span-1">
												<img className="object-contain p-1" src={track?.image} />
											</div>
											<div className="col-span-3 text-neutral-300 font-thin uppercase my-auto">{track?.title}</div>
										</div>
									);
								})}

						</div>
					</div>
					{/* {globalTapeData?.status && (
						<div className={`lg:pb-0 mx-auto py-3 lg:py-5 mt-10 max-w-7xl`}>
							<Timeline tapeData={tapeData} globalTapeData={globalTapeData} />
						</div>
					)} */}
					{/* <div className="sm:max-w-7xl w-full grid grid-cols-9 mx-auto mt-24 my-10">
						<div className="group col-start-3 col-span-2">
							<img className="border border-neutral-600 rounded-sm object-contain max-h-[200px] max-w-[200px] opacity-70 group-hover:opacity-10 transition-opacity" src={globalTapeData?.sample?.image} />
							<button className="absolute -mt-[115px] ml-[95px]"><i className="fa-solid fa-play text-3xl text-white shadow-lg" /></button>
						</div>
						<div className="col-start-6 col-span-full mx-auto uppercase font-thin text-neutral-400 tracking-widest text-2xl animate__animated animate__fadeInUp">
							curated by
							<br />
							{globalTapeData?.sample?.artist}
						</div>
					</div> */}
				</div>
			)}
		</>
	);
};
export default HedsTapes;

/* {globalTapeData?.name && tapeData?.id && (
	<div className="w-screen mt-10 md:mt-1 mx-auto bg-neutral-950">
		<div className={`h-32 bg-${globalTapeData.color}-900 w-full mx-auto object-cover`} />
		<div className="-mt-32 flex items-center md:px-0 lg:px-0 ">
			<img className="h-32 w-32 relative opacity-80" src={globalTapeData?.image} />
			<div className="flex flex-col w-full items-start md:mx-4">
				<h1
					className={`font-serif font-thin text-xl md:text-3xl tracking-widest sm:ml-0 ml-4 mx-3 sm:mx-6 text-${globalTapeData?.color}-200 rounded-sm px-5 py-2`}>
					{globalTapeData.name}
				</h1>
			</div>
		</div>
		{globalTapeData?.countdown && (
			<div className="flex justify-center text-amber-500 font-thin xl:px-0 px-2 tracking-wider mb-2 bg-neutral-900 py-2">
				<span className="mr-2">MINT OPENS IN</span>
				<DateCountdown deadline="21 May 2022 12:00:03 GMT-07:00" />
			</div>
		)}
		<Timeline tapeData={tapeData} globalTapeData={globalTapeData} />
		<SampleArtistBadge tapeData={globalTapeData} />
		{globalTapeData?.links?.opensea?.length && globalTapeData?.links?.etherscan?.length ? (
			<div className="flex justify-center sm:justify-center py-5 items-center font-sans font-thin gap-6 border-b border-neutral-800">
				<div className="inline-flex justify-center items-center flex-col mx-1">
					<IconLinkButton globalTapeData={globalTapeData} type={"etherscan"} color="neutral" />
					<span className="text-neutral-400 font-thin text-xs">CONTRACT</span>
				</div>
				<div className="inline-flex justify-center items-center flex-col mx-1">
					<IconLinkButton globalTapeData={globalTapeData} type={"opensea"} color="blue" />
					<span className="text-neutral-400 font-thin text-xs">OPENSEA</span>
				</div>
				{globalTapeData?.links?.splits?.length && (
					<div className="inline-flex justify-center items-center flex-col mx-1">
						<IconLinkButton globalTapeData={globalTapeData} type={"splits"} color="green" />
						<span className="text-neutral-400 font-thin text-xs">0xSPLITS</span>
					</div>
				)}
			</div>
		) : (
			<></>
		)}
	</div>
)} */
/* {globalTapeData && globalTapeData.status > 7 && tapeData?.tracks?.length && tapeData.hex && (
	<div className={`mx-auto sm:flex-row flex-col-reverse flex bg-gradient-to-b from-neutral-950 to-neutral-900 pb-16 pt-8 px-10 gap-10`}>
		<div className="pb-2 sm:w-3/12">
			<Playlist selectedTrack={selectedTrack} setSelectedTrack={setSelectedTrack} tapeData={tapeData?.tracks} />
		</div>
		<div className="w-12/12 sm:w-9/12 sm:px-4">
			<Waveform selectedTrack={selectedTrack} url={tapeData.tracks[selectedTrack]?.video_link} tapeData={tapeData} />
		</div>
	</div>
)}
{globalTapeData && globalTapeData.status < 7 && (
	<div className="mx-auto bg-gradient-to-b from-neutral-950 to-neutral-900  py-7 px-5">
		<SampleWaveform selectedTrack={selectedTrack} url={globalTapeData.sample.audio} globalTapeData={globalTapeData} />
	</div>
)} */
