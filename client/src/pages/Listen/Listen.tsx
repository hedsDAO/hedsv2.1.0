import React, { useEffect, Fragment } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "../../store";
import SampleContainer from "../../components/Listen/SampleContainer/SampleContainer";
import TapeHeader from "../../components/Listen/TapeHeader/TapeHeader";
import TapeInfo from "../../components/Listen/TapeInfo/TapeInfo";
import TapeArtists from "../../components/Listen/TapeArtists/TapeArtists";
import TapeTimeline from "../../components/Listen/TapeTimeline/TapeTimeline";
import { TapeStatus } from "../../models/common";
import PreMintTimeline from "../../components/Listen/PreMintTimeline/PreMintTimeline";

const Listen = () => {
	const { space, tape, id } = useParams<{ space?: string; tape: string; id: string }>();
	const dispatch = useDispatch<Dispatch>();
	const spaceData = useSelector((state: RootState) => state.spaceModel);
	const audioData = useSelector((state: RootState) => state.audioModel);
	const tapeData = useSelector((state: RootState) => state.tapeModel);
	useEffect(() => {
		dispatch.spaceModel.getSpaceData();
		dispatch.audioModel.getTapeData([space, tape])
		dispatch.audioModel.getTrackData([space, tape]);
		if (spaceData?.[tape]?.[id]?.sample) dispatch.audioModel.getSamples([space, tape]);
		dispatch.globalModel.setSpaceTapeId([space, tape, id]);
	}, []);
	useEffect(() => {
		if (spaceData?.[tape]?.[id]?.sample) dispatch.audioModel.getSamples([space, tape]);
		dispatch.globalModel.setSpaceTapeId([space, tape, id]);
		dispatch.audioModel.getTapeData([space, tape])
		dispatch.audioModel.getTrackData([space, tape]);
		if (spaceData?.[tape]?.[id]?.sample) dispatch.audioModel.getSamples([space, tape]);
	}, [id, tape]);
	return (
		<Fragment>
			{spaceData && audioData && tapeData && (
				<div className="flex flex-col px-2 xl:gap-y-0 gap-y-1">
					<div className="lg:w-full">
						<TapeHeader {...spaceData?.[tape]?.[id]} />
					</div>
					{+spaceData?.[tape]?.[id]?.status?.status >= TapeStatus.MINT_OPEN && (
						<div className="xl:inline hidden">
							<TapeInfo {...spaceData?.[tape]?.[id]} />
						</div>
					)}
					<div className="w-full xl:rounded-none rounded-md">
						{+spaceData?.[tape]?.[id]?.status?.status >= TapeStatus.SAMPLE_OPEN && (
							<div className="">
								<SampleContainer {...spaceData?.[tape]?.[id]} />
							</div>
						)}
					</div>
					{+spaceData?.[tape]?.[id]?.status?.status < TapeStatus.MINT_CLOSE &&
						tape === "hedstape" && (
							<div className="lg:w-full bg-gray-400 dark:bg-neutral-975 ">
								<TapeTimeline {...spaceData?.[tape]?.[id]} />
							</div>
						)}
					{id === "goodsociety" && (
						<div>
							<PreMintTimeline {...spaceData?.[tape]?.[id]} />
						</div>
					)}
					{+spaceData?.[tape]?.[id]?.status?.status >= TapeStatus.MINT_OPEN ||
						id === "goodsociety" ? (
						<div className="lg:w-full">
							<TapeArtists {...audioData?.tracks?.[id]} />
						</div>
					) : (
						<></>
					)}
					{+spaceData?.[tape]?.[id]?.status?.status >= TapeStatus.MINT_OPEN && (
						<div className="xl:hidden inline xl:mt-0 mt-3">
							<TapeInfo {...spaceData?.[tape]?.[id]} />
						</div>
					)}
				</div>
			)}
		</Fragment>
	);
};

export default Listen;
