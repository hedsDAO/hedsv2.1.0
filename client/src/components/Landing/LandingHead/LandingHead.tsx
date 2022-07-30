import React from "react";
import { useLocation } from "react-router";
/**
 * @name LandingHead
 * @description absolute position image behind media on landing.
 */

const LandingHead = ({ src }: { src: string }) => {
	const { pathname } = useLocation()
	return (
		<img
			src={src}
			className={`absolute object-cover top-1/4 md:right-[9.3%] z-10 md:w-[19%] cover md:top-40 lg:top-28 md:inline hidden 
        				animate-pulse border-[0.25px] rounded-sm ${pathname === "/" ? "invert" : "dark:invert-0"} saturate-100`}
		/>
	);
};

export default LandingHead;
