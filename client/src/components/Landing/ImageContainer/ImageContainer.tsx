import React from "react";

/**
 * @name ImageContainer
 * @description absolute position image, defaults to sm
 */

interface ImageContainerProps {
	src: string;
	size: string;
}
const ImageContainer = ({ src, size }: ImageContainerProps) => {
	return (
		<img
			className={
				size === "lg"
					? "absolute object-cover w-full md:w-7/12 h-screen z-20 dark:invert invert-0"
					: "object-cover absolute md:inline hidden right-0 bottom-0 z-10 max-h-[54vh] animate__animated animate__fadeInLeft dark:invert invert-0"
			}
			src={src}
		/>
	);
};

export default ImageContainer;
