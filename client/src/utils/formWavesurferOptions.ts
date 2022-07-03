import { WaveSurferParams } from "wavesurfer.js/types/params";

const formWaveSurferOptions = (ref: HTMLDivElement): WaveSurferParams => ({
	container: ref,
	waveColor: "#eee",
	progressColor: "#C025D3",
	cursorColor: "transparent",
	barWidth: 2,
	barRadius: 0,
	responsive: true,
	height: 50,
	hideScrollbar: true,
	normalize: true,
	backend: "MediaElement",
});

export { formWaveSurferOptions };
