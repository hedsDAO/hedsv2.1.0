import React, { useEffect, Fragment } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "../../store";
import TapeHeader from "../../components/Listen/TapeHeader/TapeHeader";
import TapeInfo from "../../components/Listen/TapeInfo/TapeInfo";
import TapeArtists from "../../components/Listen/TapeArtists/TapeArtists";
import TapeTimeline from "../../components/Listen/TapeTimeline/TapeTimeline";

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
		dispatch.tapeModel.getTapeData([space || "heds", tape, id]);
	}, []);

	useEffect(() => {
		dispatch.tapeModel.getTapeData([space || "heds", tape, id]);
	}, [id]);
	return (
		<Fragment>
			{spaceData && audioData && (
				<Fragment>
					<div className="w-screen">
						<TapeHeader {...spaceData?.[tape]?.[+id - 1]} />
					</div>
					<div className="">
						<TapeTimeline {...spaceData?.[tape]?.[+id - 1]} />
					</div>
					<div className="grid grid-cols-12 lg:mx-auto max-w-[100rem] gap-1.5 mt-1.5 rounded-lg mx-2">
						<TapeArtists {...tapeData} />
						<TapeInfo {...spaceData?.[tape]?.[+id - 1]} />
					</div>
				</Fragment>
			)}
		</Fragment>
	);
};

export default Listen;
