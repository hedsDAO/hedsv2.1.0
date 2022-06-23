import React from "react";
import { CustomBadgeProps } from "../../../models/ui/badges";
/**
 * @name CustomBadge
 * @version 2.0.0
 * @description default custom badge ui
 *
 * @param {String} className optional appends to className attribute.
 * @param {Boolean} disabled disables button, defaults to false if unset.
 * @param {String} onClick callback to run onclick, will default to empty function.
 * @param {any} children badge contents
 */

const CustomBadge = ({ className, color, children }: CustomBadgeProps) => {
	return (
		<div
			className={`font-sans uppercase px-4 py-2 border border-${color}-500 
            text-sm rounded-none text-${color}-500 shadow-none focus:outline-none
            hover:text-neutral-300 hover:border-neutral-300 my-1 ${className}`}>
			<span>{children}</span>
		</div>
	);
};
export default CustomBadge;
