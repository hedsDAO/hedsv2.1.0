import React from "react";
import { CustomButtonProps } from "../../../models/ui/buttons";
/**
 * @name CustomButton
 * @version 2.0.0
 * @description Connect button in nav for user wallet auth.
 *
 * @param {String} className optional appends to className attribute.
 * @param {Boolean} disabled disables button, defaults to false if unset.
 * @param {String} onClick callback to run onclick, will default to empty function.
 * @param {any} children button contents
 */

const CustomButton = ({ className, disabled, color, onClick, children }: CustomButtonProps) => {
	return (
		<button
			disabled={disabled || false}
			onClick={onClick ? () => onClick() : () => {}}
			type="button"
			className={`font-sans uppercase px-4 py-2 border border-${color}-500 
            text-sm rounded-none text-${color}-500 shadow-none focus:outline-none
            hover:text-neutral-300 hover:border-neutral-300 my-1 ${className}`}>
			<span>{children}</span>
		</button>
	);
};
export default CustomButton;
