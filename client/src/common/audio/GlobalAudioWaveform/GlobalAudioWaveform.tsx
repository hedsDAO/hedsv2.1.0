import React, { useEffect, useRef, useState } from "react";
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
	height: 30,
	hideScrollbar: true,
	// backend: "MediaElement"
});

const GlobalAudioWaveform = ({ url }: any) => {
	const waveformRef = useRef(null);
	const wavesurfer = useRef<any>(null);
	const [playing, setPlay] = useState(false);
	const [volume, setVolume] = useState<number>(1);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		setPlay(false);
		const options = formWaveSurferOptions(waveformRef.current);
		wavesurfer.current = WaveSurfer.create(options);
		console.log(url, "url");
		wavesurfer.current.load(url);
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
		wavesurfer.current.on("finish", () => {});
		return () => {
			wavesurfer.current.destroy();
		};
	}, [url]);

	const handlePlayPause = () => {
		setPlay(!playing);
		wavesurfer.current.playPause();
	};

	return <>{url && <div id="waveform" className="" ref={waveformRef} />}</>;
};

export default GlobalAudioWaveform;
