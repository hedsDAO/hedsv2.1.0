import React from "react";
import { Link } from "react-router-dom";
import { TapeStatusStyles, TapeStatusBadgeProps, TapeStatus } from "../../../models/common";

const TapeStatusBadge = ({ status, link }: TapeStatusBadgeProps) => {
	const parseTapeStatus = (): string => {
		switch (status) {
			case TapeStatus.SAMPLE_CLOSE:
				return tapeStatusStyles["sampleClose"];
			case TapeStatus.MINT_OPEN:
				return tapeStatusStyles["mint"];
			case TapeStatus.VOTE_OPEN:
				return tapeStatusStyles["vote"];
			case TapeStatus.VOTE_CLOSE:
				return tapeStatusStyles["curation"];
			case TapeStatus.SAMPLE_OPEN:
				return tapeStatusStyles["sample"];
			case TapeStatus.SUBMIT_OPEN:
				return tapeStatusStyles["submit"];
			default:
				return "fa-waveform";
		}
	};
	const tapeStatusStyles: TapeStatusStyles = {
		mint: "fa-cassette-tape text-green-500",
		vote: "fa-landmark text-green-500",
		curation: "fa-landmark text-amber-500",
		sample: "fa-waveform",
		sampleClose: "fa-waveform text-amber-500",
		submit: "fa-upload",
		sold_out: "fa-do-not-enter",
	};

	const statusIcon = (iconUrl: string, url: string) => (
		<Link key={iconUrl + url} to={url}>
			<button className="hover:bg-neutral-700 rounded-full transition-all mx-4">
				<span className={"text-sm font-medium"}>
					<span className="md:w-12 md:h-12 w-10 h-10 border border-neutral-700 flex items-center group justify-center rounded-full">
						<i className={`fa-thin ${iconUrl} text-neutral-200 my-auto md:text-base text-xs group-hover:text-neutral-200`}></i>
					</span>
				</span>
			</button>
		</Link>
	);

	return <>{statusIcon(parseTapeStatus(), link)}</>;
};

export default TapeStatusBadge;
