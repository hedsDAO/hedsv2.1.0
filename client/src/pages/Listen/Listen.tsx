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

const Listen = () => {
	const { space, tape, id } = useParams<{ space?: string; tape: string; id: string }>();
	const dispatch = useDispatch<Dispatch>();
	const spaceData = useSelector((state: RootState) => state.spaceModel);
	const audioData = useSelector((state: RootState) => state.audioModel);
	const tapeData = useSelector((state: RootState) => state.tapeModel);
	useEffect(() => {
		dispatch.spaceModel.getSpaceData();
		dispatch.audioModel.getTrackData();
		dispatch.audioModel.getTapeData();
		dispatch.audioModel.getSamples();
		dispatch.globalModel.setSpaceTapeId([space || "heds", tape, id]);
		dispatch.tapeModel.getTapeData([space || "heds", tape, id]);
	}, []);

	useEffect(() => {
		dispatch.globalModel.setSpaceTapeId([space || "heds", tape, id]);
		dispatch.tapeModel.getTapeData([space || "heds", tape, id]);
	}, [id]);
	return (
		<Fragment>
			{spaceData && audioData && (
				<div className="flex flex-col xl:px-0 px-2 gap-y-5 xl:gap-y-10">
					<div className="lg:w-full">
						<TapeHeader {...spaceData?.[tape]?.[+id - 1]} />
					</div>
					<div className="w-full gap-1 xl:rounded-none rounded-md">
						{+spaceData?.[tape]?.[+id - 1]?.status?.status >=
							TapeStatus.SAMPLE_OPEN && (
								<SampleContainer {...spaceData?.[tape]?.[+id - 1]} />
							)}
					</div>
					{+spaceData?.[tape]?.[+id - 1]?.status?.status < TapeStatus.MINT_CLOSE && (
						<div className="lg:w-full">
							<TapeTimeline {...spaceData?.[tape]?.[+id - 1]} />
						</div>
					)}
					{+spaceData?.[tape]?.[+id - 1]?.status?.status > TapeStatus.MINT_CLOSE && (
						<div className="lg:w-full">
							<TapeArtists {...tapeData} />
						</div>
					)}
					{+spaceData?.[tape]?.[+id - 1]?.status?.status > TapeStatus.MINT_CLOSE && (
						<div className="max-w-[80rem] w-full mx-auto">
							<TapeInfo {...spaceData?.[tape]?.[+id - 1]} />
						</div>
					)}
				</div>
			)}
		</Fragment>
	);
};

export default Listen;
