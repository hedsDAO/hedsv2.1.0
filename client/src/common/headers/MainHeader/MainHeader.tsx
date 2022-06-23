import React from "react";
import { MainHeaderProps } from "../../../models/ui/headers";

/**
 * @name MainHeader
 * @version 2.0.0
 * @description Renders default spacing, font-style and position for main page headers.
 *
 * @param {String} main_header top-level text
 * @param {String} sub_header subtext below main_header
 */

const MainHeader = ({ main_header, sub_header }: MainHeaderProps) => {
	return (
		<div className={`max-w-7xl mx-auto w-full object-cover xl:p-0 px-4 mb-3`}>
			<h1 className="text-neutral-300 text-5xl font-serif mx-auto pt-4">{main_header}</h1>
			<p className="sm:inline hidden uppercase font-thin text-neutral-400 mt-1 mx-auto mb-1 sm:mb-2">{sub_header}</p>
		</div>
	);
};

export default MainHeader;
