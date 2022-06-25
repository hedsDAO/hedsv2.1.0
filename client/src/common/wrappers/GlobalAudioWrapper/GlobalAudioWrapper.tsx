import React, { useEffect } from "react";
import { RootState } from "../../../store";
import { useSelector } from "react-redux";
import GlobalAudio from "../../../components/GlobalAudio/GlobalAudio";

const GlobalAudioWrapper = ({ children }: any) => {
	const globalAudioData = useSelector((state: RootState) => state.globalAudioModel);
	useEffect(() => {}, [globalAudioData?.trackDetails]);
	return (
		<>
			{children}
			<>{globalAudioData?.trackDetails?.track?.audio?.length && <GlobalAudio />}</>
		</>
	);
};

export default GlobalAudioWrapper;
