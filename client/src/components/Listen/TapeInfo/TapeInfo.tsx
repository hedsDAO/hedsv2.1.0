import React from "react";
import { TapeData } from "../../../models/spaceModel";

const TapeInfo = (tapeData: TapeData) => {
	return (
		<div className="bg-neutral-950 border-[0.25px] border-neutral-800 sm:rounded-lg rounded-sm col-span-12 lg:col-span-3 py-10">
			<div className="flex flex-col w-full justify-center items-center mt-8">
				<div className="flex -space-x-2 overflow-hidden mb-4">
					<img src={tapeData?.sample?.image} className="h-20 w-20 inline-block rounded-full" />
					<img src={tapeData?.collab?.image} className="h-20 w-20 inline-block rounded-full" />
				</div>
				<span className="text-neutral-500 mt-2 text-sm font-thin">CURATED BY</span>
				<span className="text-neutral-200 text-lg mt-1 font-thin uppercase tracking-widest">
					{tapeData?.sample?.artist} x {tapeData?.collab?.name}
				</span>
			</div>
			<hr className="border-neutral-800 border-[0.25px] mx-12 px-4 my-4" />
			{/* {collectionStats?.stats?.count > 0 && ( */}
			<div className="flex flex-col justify-center items-center mt-3 px-10">
				<div className="flex items-center justify-between w-full bg-neutral-850 text-neutral-400 uppercase px-2 py-1.5 rounded-lg">
					<span className="ml-1"> VOTING POWER</span>
					<span className="bg-neutral-900 text-sm text-neutral-300 px-2.5 py-0.5 rounded-md">
						{/* {calculateTapeVP([collectionStats?.stats?.num_owners, collectionStats?.stats?.count])} */}
					</span>
				</div>
			</div>
			{/* )} */}
			{/* {collectionStats?.stats?.count > 0 && ( */}
			<div className="flex flex-col justify-center items-center mt-2 px-10">
				<div className="flex items-center justify-between w-full bg-neutral-850 text-neutral-400 uppercase px-2 py-1.5 rounded-lg">
					<span className="ml-1">MINTED</span>
					<span className="bg-neutral-900 text-sm text-neutral-300 px-2.5 py-0.5 rounded-md">
						{/* {collectionStats?.stats?.count} */}
					</span>
				</div>
			</div>
			{/* )} */}
			{/* {collectionStats?.stats?.num_owners > 0 && ( */}
			<div className="flex flex-col justify-center items-center mt-2 px-10">
				<div className="flex items-center justify-between w-full bg-neutral-850 text-neutral-400 uppercase px-2 py-1.5 rounded-lg">
					<span className="ml-1">OWNERS</span>
					<span className="bg-neutral-900 text-sm text-neutral-300 px-2.5 py-0.5 rounded-md">
						{/* {collectionStats?.stats?.num_owners} */}
					</span>
				</div>
			</div>
			{/* )} */}
			{/* {collectionStats?.stats?.total_volume > 0 && ( */}
			<div className="flex flex-col justify-center items-center mt-2 px-10">
				<div className="flex items-center justify-between w-full bg-neutral-850 text-neutral-400 uppercase px-2 py-1.5 rounded-lg">
					<span className="ml-1"> TOTAL VOLUME</span>
					<span className="bg-neutral-900 text-sm text-neutral-300 px-2.5 py-0.5 rounded-md">
						{/* {(collectionStats?.stats?.total_volume).toFixed(2)} ETH */}
					</span>
				</div>
			</div>
			{/* )} */}
		</div>
	);
};

export default TapeInfo;
