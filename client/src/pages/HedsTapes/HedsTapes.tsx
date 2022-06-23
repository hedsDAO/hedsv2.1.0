import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { RootState, Dispatch } from "../../store";
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
	return (
		<>
			{globalTapeData?.name && tapeData?.id && (
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
			)}
			{globalTapeData && globalTapeData.status > 7 && tapeData?.tracks?.length && tapeData.hex && (
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
			)}
		</>
	);
};
export default HedsTapes;
