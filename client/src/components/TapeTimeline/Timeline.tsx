// @ts-nocheck
import React from "react";
import { TimelineProps, TapeStatus } from "../../models/common";
import Sample from "./Sample/Sample";
import Mint from "./Mint/Mint";
import Submit from "./Submit/Submit";
import Vote from "./Vote/Vote";
import useMoralisHooks from "../../hooks/useMoralis";

const Timeline = ({ globalTapeData }: TimelineProps) => {
	const { user } = useMoralisHooks();
	const { status } = globalTapeData;
	return (
		<nav className="flex items-center justify-center py-6 max-w-6xl mx-6 lg:mx-auto">
			<ol role="list" className="flex items-end w-full justify-evenly sm:justify-between">
				<li className="flex flex-col justify-center items-center">
					<Sample
						completed={status > TapeStatus.SAMPLE_OPEN}
						active={status === TapeStatus.SAMPLE_OPEN}
						globalTapeData={globalTapeData}
					/>
				</li>
				<li className="flex flex-col justify-center items-center">
					<Submit
						completed={status > TapeStatus.SUBMIT_CLOSE}
						active={status === TapeStatus.SUBMIT_OPEN && user}
						globalTapeData={globalTapeData}
					/>
				</li>
				<li className="flex flex-col justify-center items-center">
					<Vote
						completed={status > TapeStatus.VOTE_OPEN}
						active={status === TapeStatus.VOTE_OPEN && user}
						globalTapeData={globalTapeData}
					/>
				</li>
				<li className="flex flex-col justify-center items-center">
					<Mint
						completed={status > TapeStatus.MINT_OPEN}
						active={status === TapeStatus.MINT_OPEN}
						globalTapeData={globalTapeData}
					/>
				</li>
			</ol>
		</nav>
	);
};

export default Timeline;
