import React from "react";
import { ModalNoteContainerProps } from "../../../models/ui/containers";
/**
 * @name ModalNoteContainer
 * @version 2.0.0
 * @description Information container for text in modals.
 *
 * @param {String} header header text for modal (uppercased)
 * @param {Boolean} body header text for modal
 * @param {String} headerColor (optional) color for header, defaults to amber-500
 * @param {String} bodyColor (optional) color for body, defaults to amber-500
 * @param {any} children jsx child components
 */

const ModalNoteContainer = ({ header, body, headerColor, bodyColor, children }: ModalNoteContainerProps) => {
	return (
		<div className="bg-neutral-950 rounded-md my-2 p-1">
			<h6 className={`bg-neutral-900 text-center font-thin uppercase my-2 py-2 rounded-md mx-2 ${headerColor || "text-amber-500"}`}>
				<i className={`fa-thin fa-circle-exclamation mr-2`}></i>
				{header}
			</h6>
			<div className="flex flex-col items-center justify-center text-blue-500 hover:text-blue-200 bg-neutral-850 hover:bg-neutral-900 mx-32 py-3 my-5 transition-all rounded-md">
				{children}
			</div>
			<p
				className={`${
					bodyColor || "text-neutral-200"
				} bg-neutral-900 font-thin text-center text-sm py-4 px-14 rounded-md my-2 mx-2`}>
				{body}
			</p>
		</div>
	);
};

export default ModalNoteContainer;
