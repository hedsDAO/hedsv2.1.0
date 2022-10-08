import React, { useState } from "react";
import { TapeData } from "../../../models/spaceModel";
// import { PlayIcon } from "@heroicons/react/solid";
import { useDispatch } from "react-redux";
import { Dispatch } from "../../../store";
import { PlayerSize } from "../../../models/common";
import { useParams } from "react-router";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { handleDownloadFile } from "../../../utils/handleDownloadFile";
import { generateSampleLink } from "../../../utils/generateSampleLink";
import { Modals } from "../../../models/globalModel";
import { useMoralis } from "react-moralis";
import LoadingIcon from "../../../common/svg/LoadingIcon/LoadingIcon";

const SampleContainer = (tapeData: TapeData) => {
    const [isLoading, setIsLoading] = useState(false);
    const { tape, id } = useParams<{ tape: string; id: string }>();
    const { user } = useMoralis();
    const dispatch = useDispatch<Dispatch>();
    const storage = getStorage();
    const sampleRef = ref(storage, generateSampleLink(id));
    const playSample = () => {
        dispatch.audioModel.setIsSample(true);
        dispatch.audioModel.setCurrentTape(tape);
        dispatch.audioModel.setCurrentTapeId(id);
        dispatch.audioModel.setCurrentTrack(0);
        dispatch.audioModel.setPlayerSize(PlayerSize.SMALL);
    };
    const handleGetSample = () => {
        setIsLoading(true);
        getDownloadURL(sampleRef).then((url: string) => {
            setIsLoading(false)
            return handleDownloadFile(url, `HT${id}`);
        });
    };
    return (
        <div className="from-gray-300 to-gray-200 bg-gradient-to-b lg:bg-gradient-to-br dark:from-neutral-975 dark:to-neutral-950 rounded-xl mx-2 xl:mx-auto lg:py-2 xl:mb-1">
            <div className="flex xl:flex-row flex-col items-center justify-center xl:justify-between max-w-2xl gap-y-2 md:mx-auto px-6 py-6 rounded-lg">
                <img
                    src={tapeData?.sample?.image}
                    className="item--sphere w-16 h-16 rounded-full m-0.5 justify-self-start ring-1 dark:ring-neutral-800 ring-neutral-800 xl:mr-2 shadow-sm"
                />
                <div className="flex flex-col lg:px-2 px-3 items-center xl:items-start justify-center w-full gap-x-2 xl:mb-0 mb-3">
                    <span className="text-neutral-700 dark:text-neutral-200 text-xs mb-1">
                        <i className="fa-thin fa-waveform mr-1 text-[0.65rem]" /> sample curator
                    </span>
                    <span className="text-neutral-700 dark:text-neutral-200 uppercase font-semibold tracking-widest text-lg lg:text-xl">
                        {tapeData?.sample?.artist}
                    </span>
                    <span className="inline-flex items-baseline text-neutral-700 dark:text-neutral-300 uppercase font-regular tracking-widest text-sm lg:text-base">
                        <span className="text-neutral-600 dark:text-neutral-400 tracking-tight font-light text-sm lg:text-base mr-1.5">
                            bpm
                        </span>{" "}
                        {tapeData?.sample?.bpm}
                    </span>
                </div>
                <div className="flex flex-row items-center gap-2 mx-2">
                    <button
                        onClick={
                            user?.attributes?.ethAddress
                                ? () => handleGetSample()
                                : () =>
                                      dispatch.globalModel.setModal({
                                          open: true,
                                          modal: Modals.WARNING,
                                          locked: true,
                                      })
                        }
                        className="inline-flex items-center shadow-md justify-center text-center px-6 py-1 text-sm hover:bg-indigo-400 dark:hover:bg-fuchsia-500 dark:bg-fuchsia-600 bg-indigo-500 text-white rounded-sm uppercase transition-all w-full">
                        <span className="my-auto tracking-widest">{!isLoading ? "DOWNLOAD" : <LoadingIcon />}</span>
                    </button>
                    <button
                        onClick={() => playSample()}
                        className="inline-flex items-center shadow-md justify-center text-center px-6 py-1 text-sm dark:hover:bg-indigo-400 hover:bg-fuchsia-500 bg-fuchsia-600 dark:bg-indigo-500 text-white rounded-sm uppercase transition-all w-full">
                        <span className="my-auto tracking-widest">LISTEN</span>
                    </button>
                </div>
            </div>
        </div>
    );
};
export default SampleContainer;
