import React from "react";
import { PlayIcon, ChevronLeftIcon, ChevronRightIcon, PauseIcon } from "@heroicons/react/solid";

const AudioControls = ({ isPlaying, onPlayPauseClick, onPrevClick, onNextClick }: any) => (
	<>
		<div className="flex items-center audio-controls">
			<button type="button" className="text-sm font-medium text-stone-100 mx-1" aria-label="Previous" onClick={onPrevClick}>
				<ChevronLeftIcon
					className={`h-6 w-6 text-center text-neutral-400
              z-40 group-hover:text-amber-900 transition-all ease-in-out duration-200 mt-0.5`}
					aria-hidden="true"
				/>
			</button>
			{isPlaying ? (
				<button
					type="button"
					className="text-sm font-medium text-stone-100 mx-1"
					onClick={() => onPlayPauseClick(false)}
					aria-label="Pause">
					<PauseIcon
						className={`h-8 w-8 text-center text-amber-500
              z-40 group-hover:text-amber-900 transition-all ease-in-out duration-200 mt-0.5`}
						aria-hidden="true"
					/>
				</button>
			) : (
				<button
					type="button"
					className="text-sm font-medium text-stone-100 mx-1"
					onClick={() => onPlayPauseClick(true)}
					aria-label="Play">
					<PlayIcon
						className={`h-8 w-8 text-center text-amber-500
              z-40 group-hover:text-amber-900 transition-all ease-in-out duration-200 mt-0.5`}
						aria-hidden="true"
					/>
				</button>
			)}
			<button type="button" className="text-sm font-medium text-stone-100 mx-1" aria-label="Next" onClick={onNextClick}>
				<ChevronRightIcon
					className={`h-6 w-6 text-center text-neutral-400
              z-40 group-hover:text-amber-900 transition-all ease-in-out duration-200 mt-0.5`}
					aria-hidden="true"
				/>
			</button>
		</div>
	</>
);

export default AudioControls;
