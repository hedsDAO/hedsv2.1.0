import React, { useEffect, Fragment } from "react";
import { TapeData } from "../../../models/spaceModel";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "../../../store";
import { generateStatusColors } from "../../../utils/generateTapeLanguage";
import { generateStatusLanguage } from "../../../utils/generateStatusLanguage";

const TapeInfo = (tapeData: TapeData) => {
	const { space, tape, id } = useParams<{ space: string; tape: string; id: string }>();
	const dispatch = useDispatch<Dispatch>();
	const openSeaData = useSelector((state: RootState) => state.openSeaModel);
	useEffect(() => {
		dispatch.openSeaModel.getCollectionData(`hedstape-${id}`);
	}, [id]);

	return (
		<div className="col-span-12 lg:col-span-3 p-1 bg-gray-300 dark:bg-neutral-975 rounded-md">
			<div className="grid grid-cols-1 lg:grid-cols-1 rounded-md w-full">
				<div className="flex flex-col justify-start gap-1 rounded-sm">
					<h3 className="text-neutral-600 dark:text-neutral-500 uppercase text-xs tracking-wide mx-1 pl-0.5 py-1">TAPE DETAILS</h3>
					<div className="inline-flex items-center justify-between w-full bg-neutral-200 dark:bg-neutral-900 px-2.5 py-1.5 rounded-sm">
						<span className="font-thin font-serif text-neutral-500 dark:text-neutral-500 text-sm">status</span>
						<span
							className="uppercase font-serif text-neutral-800 dark:text-neutral-500 text-sm"
							style={{ color: generateStatusColors(tapeData?.status?.status) }}>
							{generateStatusLanguage(tapeData?.status?.status)}
						</span>
					</div>
					<div className="inline-flex items-center justify-between w-full bg-neutral-200 dark:bg-neutral-900 px-2.5 py-1.5 rounded-sm">
						<span className="font-thin font-serif text-neutral-500 dark:text-neutral-500 text-sm">space</span>
						<span className="uppercase font-serif text-neutral-800 dark:text-neutral-500 text-sm">{space || "heds"}</span>
					</div>
					<div className="inline-flex items-center justify-between w-full bg-neutral-200 dark:bg-neutral-900 px-2.5 py-1.5 rounded-sm">
						<span className="font-thin font-serif text-neutral-500 dark:text-neutral-500 text-sm">tape</span>
						<span className="uppercase font-serif text-neutral-800 dark:text-neutral-500 text-sm">{tape}</span>
					</div>
					<div className="inline-flex items-center justify-between w-full bg-neutral-200 dark:bg-neutral-900 px-2.5 py-1.5 rounded-sm">
						<span className="font-thin font-serif text-neutral-500 dark:text-neutral-500 text-sm">no</span>
						<span className="uppercase font-serif text-neutral-800 dark:text-neutral-500 text-sm">{id}</span>
					</div>
					<div className="inline-flex items-center justify-between w-full bg-neutral-200 dark:bg-neutral-900 px-2.5 py-1.5 rounded-sm">
						<span className="font-thin font-serif text-neutral-500 dark:text-neutral-500 text-sm">bpm</span>
						<span className="uppercase font-serif text-neutral-800 dark:text-neutral-500 text-sm">{tapeData?.sample?.bpm}</span>
					</div>
					{openSeaData && (
						<Fragment>
							<div className="inline-flex items-center justify-between w-full bg-neutral-200 dark:bg-neutral-900 px-2.5 py-1.5 rounded-sm">
								<span className="font-thin font-serif text-neutral-500 dark:text-neutral-500 text-sm">voting power</span>
								<span className="uppercase font-serif text-neutral-800 dark:text-neutral-500 text-sm">{openSeaData?.calculatedVP}</span>
							</div>
							<div className="inline-flex items-center justify-between w-full bg-neutral-200 dark:bg-neutral-900 px-2.5 py-1.5 rounded-sm">
								<span className="font-thin font-serif text-neutral-500 dark:text-neutral-500 text-sm">minted</span>
								<span className="uppercase font-serif text-neutral-800 dark:text-neutral-500 text-sm">{openSeaData?.minted}</span>
							</div>
							<div className="inline-flex items-center justify-between w-full bg-neutral-200 dark:bg-neutral-900 px-2.5 py-1.5 rounded-sm">
								<span className="font-thin font-serif text-neutral-500 dark:text-neutral-500 text-sm">owners</span>
								<span className="uppercase font-serif text-neutral-800 dark:text-neutral-500 text-sm">{openSeaData?.numOfOwners}</span>
							</div>
							<div className="inline-flex items-center justify-between w-full bg-neutral-200 dark:bg-neutral-900 px-2.5 py-1.5 rounded-sm">
								<span className="font-thin font-serif text-neutral-500 dark:text-neutral-500 text-sm">volume</span>
								<span className="uppercase font-serif text-neutral-800 dark:text-neutral-500 text-sm">
									{openSeaData.totalVolume.toFixed(3)} <span className="font-thin font-serif">ETH</span>
								</span>
							</div>
						</Fragment>
					)}
				</div>
			</div>
			<div className="flex justify-center items-center gap-x-2 mx-1 my-1 px-2.5">
				<a target={"_blank"} href={tapeData?.links?.opensea} className="text-neutral-500 text-lg">
					<i className="fak fa-opensea"></i>
				</a>
				<a target={"_blank"} href={tapeData?.links?.etherscan} className="text-neutral-500 text-lg">
					<i className="fak fa-etherscan"></i>
				</a>
			</div>
		</div>
	);
};

export default TapeInfo;
