import React, { useEffect, Fragment } from "react";
import { RootState } from "../../../store";
import { useSelector } from "react-redux";
import { PlayerSize } from "../../../models/common";
import GlobalAudio from "../../../components/GlobalAudio/GlobalAudio";

const AudioWrapper = ({ children }: { children: JSX.Element }) => {
	const audioData = useSelector((state: RootState) => state.audioModel);
	useEffect(() => {}, [audioData]);
	return (
		<Fragment>
			{children}
			<Fragment>
				{audioData?.playerSize !== PlayerSize.HIDDEN && typeof audioData?.currentTrack === "number" ? <GlobalAudio /> : <></>}
			</Fragment>
		</Fragment>
	);
};

export default AudioWrapper;
