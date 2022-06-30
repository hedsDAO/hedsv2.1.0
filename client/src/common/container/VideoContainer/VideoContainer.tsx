import React from "react";

/**
 * @name VideoContainer
 * @description absolute position video, defaults to sm
 */

interface VideoContainerProps {
	src: string;
	size?: string;
}

const VideoContainer = ({ src, size }: VideoContainerProps) => {
	return (
		<video
			playsInline
			autoPlay
			muted
			loop
			className={
				size === "lg"
					? "object-cover absolute md:inline hidden right-0 bottom-0 z-10 max-h-[54vh] animate__animated animate__fadeInLeft"
					: "absolute object-cover w-full md:w-7/12 h-screen z-20"
			}
			src={src}
		/>
	);
};

export default VideoContainer;
