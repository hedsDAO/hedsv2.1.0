import React, { useEffect } from "react";
import { RootState, Dispatch } from "../../../store";
import { useSelector, useDispatch } from "react-redux";
import GlobalAudio from "../../../components/GlobalAudio/GlobalAudio";

const GlobalAudioWrapper = ({ children }: any) => {
    const globalAudioData = useSelector((state: RootState) => state.globalAudioModel);
    const dispatch = useDispatch<Dispatch>();

    useEffect(() => {
        console.log('it changed')
    }, [globalAudioData])

    return (
        <>
            {children}
            <>{globalAudioData?.trackDetails?.src && <GlobalAudio />}</>
        </>
    )
}

export default GlobalAudioWrapper;