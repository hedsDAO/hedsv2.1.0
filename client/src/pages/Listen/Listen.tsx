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
	return (
		<Fragment>
			{spaceData && audioData && (
				<Fragment>
					<div className="w-screen mt-1 lg:mb-40 mb-20">
						<TapeHeader {...spaceData?.[tape]?.[+id - 1]} />
					</div>
					<div className="lg:mt-10">
						<TapeTimeline {...spaceData?.[tape]?.[+id - 1]} />
					</div>
					<div className="grid grid-cols-12 mx-auto gap-x-3 px-5 max-w-[93rem] pt-3 my-10 pb-32">
						<TapeInfo {...spaceData?.[tape]?.[+id - 1]} />
						<TapeArtists {...tapeData} />
					</div>
				</Fragment>
			)}
		</Fragment>
	);
};

export default Listen;
