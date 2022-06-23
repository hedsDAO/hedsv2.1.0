import React from "react";
import { ConnectButtonProps } from "../../../models/ui/buttons";

/**
 * @name ConnectButton
 * @version 2.0.0
 * @description Connect button in nav for user wallet auth.
 *
 * @param {String} bg_color button bg color (ie: bg-neutral-900)
 * @param {String} bg_hover_color button bg color on hover (ie: hover:bg-neutral-800)
 * @param {String} text_color button text color (ie: text-neutral-200)
 * @param {String} text_hover_color button text color on hover (ie: hover:text-neutral-500)
 * @param {String} focus_ring_color button ring outline color on click (ie: focus:ring-amber-500)
 * @param {String} font_weight font weight for children in the button (ie: font-bold)
 * @param {any} children button contents
 */

const ConnectButton = ({
	bg_color,
	bg_hover_color,
	text_color,
	text_hover_color,
	focus_ring_color,
	font_weight,
	onClick,
	children
}: ConnectButtonProps) => {
	return (
		<button
			onClick={onClick ? () => onClick() : () => {}}
			type="button"
			className={`relative tracking-widest inline-flex 
            items-center px-4 py-2 border border-transparent 
            shadow-sm text-sm rounded-none 
            ${bg_color} ${bg_hover_color} 
            ${text_color} ${text_hover_color} 
            ${focus_ring_color} ${font_weight}
            focus:outline-none 
            transition-all`}>
			<span>{children}</span>
		</button>
	);
};
export default ConnectButton;
