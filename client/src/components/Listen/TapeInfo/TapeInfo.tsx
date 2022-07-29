import React, { useEffect, Fragment } from "react";
import { TapeData } from "../../../models/spaceModel";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "../../../store";
import { generateStatusColors } from "../../../utils/generateTapeLanguage";
import { generateStatusLanguage } from "../../../utils/generateStatusLanguage";

const TapeInfo = (tapeData: TapeData) => {
	const { id } = useParams<{ space: string; tape: string; id: string }>();
	const dispatch = useDispatch<Dispatch>();
	const openSeaData = useSelector((state: RootState) => state.openSeaModel);
	useEffect(() => {
		dispatch.openSeaModel.getCollectionData(`hedstape-${id}`);
	}, [id]);

	return (
		<div className="max-w-[80rem] mx-auto w-full">
			<div className="inline-flex justify-start items-baseline rounded-md px-1.5 w-full xl:mt-4 mb-1.5">
				<i className="fa-regular fa-list-ul text-neutral-700 dark:text-neutral-400 text-xs place-self-center self-center -mb-0.25" />
				<span className="text-neutral-700 dark:text-neutral-400 tracking-widest px-3 font-semibold text-lg">DETAILS</span>
			</div>
			<div className="max-w-[80rem] w-full bg-gray-300 dark:bg-neutral-975 p-1 rounded-md mx-auto">
				<div className="grid lg:grid-cols-3 grid-cols-1 items-center rounded-md w-full gap-1">
					<div className="col-span-1 inline-flex items-center justify-center w-full bg-neutral-200 dark:bg-neutral-900 px-4 py-1.5 rounded-md">
						<span
							className="col-span-1 uppercase text-neutral-800 dark:text-neutral-500 text-xs tracking-widest"
							style={{ color: generateStatusColors(tapeData?.status?.status) }}>
							{generateStatusLanguage(tapeData?.status?.status)}
						</span>
					</div>
					<div className="col-span-1 inline-flex items-center justify-between w-full bg-neutral-200 dark:bg-neutral-900 px-4 py-1.5 rounded-md">
						<span className="font-medium font-sans uppercase text-neutral-700 dark:text-neutral-500 text-xs">bpm:</span>
						<span className="uppercase tracking-wide font-semibold text-neutral-900 dark:text-amber-500/70 text-xs">{tapeData?.sample?.bpm}</span>
					</div>
					{openSeaData && (
						<Fragment>
							<div className="col-span-1 inline-flex items-center justify-between w-full bg-neutral-200 dark:bg-neutral-900 px-4 py-1.5 rounded-md">
								<span className="font-medium font-sans uppercase text-neutral-700 dark:text-neutral-500 text-xs">voting power:</span>
								<span className={`uppercase font-semibold text-neutral-800 dark:text-neutral-500 text-xs ${openSeaData?.calculatedVP === 0 ? "dark:text-red-400/70 text-red-500/70" : "dark:text-green-400 text-green-500"}`}>{openSeaData?.calculatedVP}</span>
							</div>
							<div className="col-span-1 inline-flex items-center justify-between w-full bg-neutral-200 dark:bg-neutral-900 px-4 py-1.5 rounded-md">
								<span className="font-medium font-sans uppercase text-neutral-700 dark:text-neutral-500 text-xs">minted:</span>
								<span className={`uppercase font-semibold text-neutral-800 dark:text-neutral-500 text-xs ${openSeaData?.minted === 0 ? "dark:text-red-400/70 text-red-500/70" : "dark:text-green-400 text-green-500"}`}>{openSeaData?.minted}</span>
							</div>
							<div className="col-span-1 inline-flex items-center justify-between w-full bg-neutral-200 dark:bg-neutral-900 px-4 py-1.5 rounded-md">
								<span className="font-medium font-sans uppercase text-neutral-700 dark:text-neutral-500 text-xs">owners:</span>
								<span className={`uppercase font-semibold text-neutral-800 dark:text-neutral-500 text-xs ${openSeaData?.numOfOwners === 0 ? "dark:text-red-400/70 text-red-500/70" : "dark:text-green-400 text-green-500"}`}>{openSeaData?.numOfOwners}</span>
							</div>
							<div className="col-span-1 inline-flex items-center justify-between w-full bg-neutral-200 dark:bg-neutral-900 px-4 py-1.5 rounded-md">
								<span className="font-medium font-sans uppercase text-neutral-700 dark:text-neutral-500 text-xs">volume:</span>
								<span className={`uppercase font-semibold text-neutral-800 dark:text-neutral-500 text-xs ${+openSeaData?.totalVolume.toFixed(0) == 0 ? "dark:text-red-400/70 text-red-500/70" : "dark:text-green-400 text-green-500"}`}>
									{openSeaData.totalVolume.toFixed(3)} <span className="font-medium font-sans uppercase">ETH</span>
								</span>
							</div>
						</Fragment>
					)}

				</div>
				{/* <div className="flex justify-center items-center gap-x-2 mx-1 my-1 px-1.5">
				<a target={"_blank"} href={tapeData?.links?.opensea} className="text-neutral-500 text-lg">
					<i className="fak fa-opensea"></i>
				</a>
				<a target={"_blank"} href={tapeData?.links?.etherscan} className="text-neutral-500 text-lg">
					<i className="fak fa-etherscan"></i>
				</a>
			</div> */}
			</div>
		</div>
	);
};

export default TapeInfo;
