import React from "react";
import { DocumentData } from "firebase/firestore";

const SampleArtistBadge = ({ tapeData }: DocumentData) => {
	return (
		<div className="flex items-center justify-center space-x-5 border-y border-neutral-800 pb-0.5">
			{tapeData && (
				<div className="flex justify-start my-1">
					<img
						className={`w-10 h-10 sm:h-12 sm:w-12 ring-1 ring-${tapeData?.color}-700 rounded-full my-auto mr-2 bg-neutral-900 p-0.5`}
						src={tapeData?.sample?.image}
						alt={tapeData?.sample?.name}
					/>
					<div className="flex items-start flex-col text-xs font-extralight tracking-widest uppercase text-neutral-100 my-5 ml-1">
						SAMPLED FROM
						<p
							className={`text-xs md:text-sm font-bold tracking-widest text-${tapeData?.color}-200 uppercase group-hover:text-gray-200 ease-in-out duration-300`}>
							{tapeData?.sample?.artist}
						</p>
					</div>
				</div>
			)}
		</div>
	);
};
export default SampleArtistBadge;
