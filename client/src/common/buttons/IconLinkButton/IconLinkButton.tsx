import React from "react";
import { TapeData } from "../../../models/globalTapesModel";

interface IconLinkButtonProps {
	globalTapeData: TapeData;
	type: string;
	color: string;
}

const IconLinkButton = ({ globalTapeData, type, color }: IconLinkButtonProps) => {
	return (
		// @ts-ignore
		<a className="group text-left my-2" href={globalTapeData.links[type]} target="_blank">
			<span className={`flex items-start font-medium`}>
				<span className="flex-shrink-0">
					<span className={`md:w-12 md:h-12 w-10 h-10 border flex items-center justify-center rounded-full border-${color}-500`}>
						<i className={`fak fa-${type} text-neutral-400 text-sm my-auto md:text-base`}></i>
					</span>
				</span>
			</span>
		</a>
	);
};

export default IconLinkButton;
