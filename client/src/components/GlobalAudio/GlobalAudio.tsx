import React, { useEffect, useState, useRef } from "react";
import { RootState, Dispatch } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import { PlayIcon } from "@heroicons/react/solid";
import ReactLoading from "react-loading";
import WaveSurfer from "wavesurfer.js";

const formWaveSurferOptions = (ref: any) => ({
    container: ref,
    waveColor: "#eee",
    progressColor: "#f59e0b",
    cursorColor: "transparent",
    barWidth: 6,
    barRadius: 2,
    responsive: true,
    height: 10,
    hideScrollbar: true
    // backend: "MediaElement"
});


const GlobalAudio = () => {
    const dispatch = useDispatch<Dispatch>();
    const globalAudioData = useSelector((state: RootState) => state.globalAudioModel)

    const waveformRef = useRef(null);
    const wavesurfer = useRef<any>(null);
    const [playing, setPlay] = useState(false);
    const [volume, setVolume] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setPlay(false);
        const options = formWaveSurferOptions(waveformRef.current);
        wavesurfer.current = WaveSurfer.create(options);
        wavesurfer.current.load(globalAudioData?.trackDetails?.src);
        setLoading(true);
        wavesurfer.current.on("waveform-ready", () => {
            setLoading(false);
        });
        wavesurfer.current.on("ready", function () {
            if (wavesurfer.current) {
                setLoading(false);
                wavesurfer?.current?.setVolume(volume);
                setVolume(volume);
            }
        });
        wavesurfer.current.on("finish", () => {

        });
        return () => {
            wavesurfer.current.destroy();
        };
    }, [globalAudioData?.trackDetails]);

    const handlePlayPause = () => {
        setPlay(!playing);
        wavesurfer.current.playPause();
    };



    useEffect(() => {

    }, [globalAudioData?.trackDetails?.src])
    return (
        <div className="bottom-0 fixed h-30 z-50">
            <div className="bg-neutral-700 w-screen px-4 py-5">
                <div id="controls">
                    <i className="fa-solid fa-play"></i>
                </div>
                <div className="lg:px-0 md:px-3 px-5">
                    <div className="grid grid-cols-12 items-center gap-6">
                        <div className="col-span-2 sm:col-span-1">
                            <button disabled={loading} onClick={handlePlayPause} className="">
                                {playing || loading ? (
                                    <ReactLoading
                                        className="w-8 h-8 my-auto bg-neutral-900 rounded-full"
                                        type={"bars"}
                                        color={"#f59e0b"}
                                        height={"32"}
                                        width={"32"}
                                    />
                                ) : (
                                    <PlayIcon
                                        className="w-8 h-8 text-center text-amber-500 z-40 group-hover:text-amber-900 transition-all ease-in-out duration-200"
                                        aria-hidden="true"
                                    />
                                )}
                            </button>
                        </div>
                        <div className="col-span-5 sm:col-span-7 md:col-span-9 lg:col-span-11 mb-1">
                            <div id="waveform" className="" ref={waveformRef} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GlobalAudio;





