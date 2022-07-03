import React from "react";
/**
 * @name LandingHead
 * @description absolute position image behind media on landing.
 */

const LandingHead = ({ src }: { src: string }) => {
	return (
		<img
			className={`absolute object-cover top-1/4 md:right-[9.3%] 
        z-10 md:w-[20%] cover md:top-40 lg:top-28 md:inline hidden 
        animate-pulse border-[0.25px] rounded-sm border-neutral-400`}
			src={src}
		/>
	);
};

export default LandingHead;
