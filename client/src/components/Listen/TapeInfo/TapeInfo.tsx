import React, { useEffect } from "react";
import { TapeData } from "../../../models/spaceModel";
import { useParams } from "react-router";
import SplitsIcon from "../../../common/svg/SplitsIcon/SplitsIcon";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "../../../store";
import { TapeStatus } from "../../../models/common";

const TapeInfo = (tapeData: TapeData) => {
	const { space, tape, id } = useParams<{ space: string; tape: string; id: string }>();
	const dispatch = useDispatch<Dispatch>();
	const openSeaData = useSelector((state: RootState) => state.openSeaModel);
	useEffect(() => {
		dispatch.openSeaModel.getCollectionData(`hedstape-${id}`);
	}, []);

	const generateStatusLanguage = (status: string) => {
		if (+status >= TapeStatus?.MINT_CLOSE) return "closed";
		if (+status === TapeStatus?.MINT_OPEN) return "mint open";
		if (+status === TapeStatus?.VOTE_CLOSE) return "in curation";
		if (+status === TapeStatus?.VOTE_OPEN) return "voting open";
		if (+status === TapeStatus?.SUBMIT_CLOSE) return "submissions closed";
		if (+status === TapeStatus?.SUBMIT_OPEN) return "submissions open";
		if (+status === TapeStatus?.SAMPLE_OPEN) return "sample open";
		if (+status === TapeStatus?.SAMPLE_CLOSE) return "pending";
		if (+status === TapeStatus?.PENDING) return "pending";
	};

	const generateStatusColors = (status: string) => {
		if (+status >= TapeStatus?.MINT_CLOSE) return "#9f0000";
		if (+status === TapeStatus?.MINT_OPEN) return "green";
		if (+status === TapeStatus?.VOTE_CLOSE) return "golderod";
		if (+status === TapeStatus?.VOTE_OPEN) return "green";
		if (+status === TapeStatus?.SUBMIT_CLOSE) return "#9f0000";
		if (+status === TapeStatus?.SUBMIT_OPEN) return "green";
		if (+status === TapeStatus?.SAMPLE_OPEN) return "green";
		if (+status === TapeStatus?.SAMPLE_CLOSE) return "golderod";
		if (+status === TapeStatus?.PENDING) return "golderod";
	};
	return (
		<div className="col-span-12 lg:col-span-3 h-full p-1 bg-neutral-975 rounded-lg">
			<div className="grid grid-cols-1 lg:grid-cols-1 rounded-md h-full w-full">
				<div className="flex flex-col justify-center gap-1 p-1.5 h-full rounded-md">
					{openSeaData?.calculatedVP && (
						<div className="flex flex-col items-center justify-evenly rounded-md bg-neutral-900 h-full w-full px-10 py-5">
							<h2 className="text-xl text-center font-serif text-neutral-500 lg:pt-0 pt-5 lg:mb-5">{tapeData?.tape?.name}</h2>
							<h6 className="lg:mx-auto mr-auto font-serif text-neutral-500 lg:pt-0 pt-5 mb-3 text-sm">details:</h6>
							<div className="inline-flex items-center justify-between w-full border-b-[0.25px] border-b-neutral-800 pb-0.5 mx-2">
								<span className="font-thin font-serif text-neutral-600 mr-1 text-sm">status:</span>
								<span
									className="uppercase font-serif text-neutral-500 text-sm"
									style={{ color: generateStatusColors(tapeData?.status?.status) }}>
									{generateStatusLanguage(tapeData?.status?.status)}
								</span>
							</div>
							<div className="inline-flex items-center justify-between w-full border-b-[0.25px] border-b-neutral-800 pb-0.5 mx-2">
								<span className="font-thin font-serif text-neutral-600 mr-1 text-sm">space:</span>
								<span className="uppercase font-serif text-neutral-500 text-sm">{space || "heds"}</span>
							</div>
							<div className="inline-flex items-center justify-between w-full border-b-[0.25px] border-b-neutral-800 pb-0.5 mx-2">
								<span className="font-thin font-serif text-neutral-600 mr-1 text-sm">tape:</span>
								<span className="uppercase font-serif text-neutral-500 text-sm">{tape}</span>
							</div>
							<div className="inline-flex items-center justify-between w-full border-b-[0.25px] border-b-neutral-800 pb-0.5 mx-2">
								<span className="font-thin font-serif text-neutral-600 mr-1 text-sm">no:</span>
								<span className="uppercase font-serif text-neutral-500 text-sm">{id}</span>
							</div>
							<div className="inline-flex items-center justify-between w-full border-b-[0.25px] border-b-neutral-800 pb-0.5 mx-2">
								<span className="font-thin font-serif text-neutral-600 mr-1 text-sm">bpm:</span>
								<span className="uppercase font-serif text-neutral-500 text-sm">{tapeData?.sample?.bpm}</span>
							</div>
							<div className="inline-flex items-center justify-between w-full border-b-[0.25px] border-b-neutral-800 pb-0.5 mx-2">
								<span className="font-thin font-serif text-neutral-600 mr-1 text-sm">voting power:</span>
								<span className="uppercase font-serif text-neutral-500 text-sm">{openSeaData?.calculatedVP}</span>
							</div>
							<div className="inline-flex items-center justify-between w-full border-b-[0.25px] border-b-neutral-800 pb-0.5 mx-2">
								<span className="font-thin font-serif text-neutral-600 mr-1 text-sm">minted:</span>
								<span className="uppercase font-serif text-neutral-500 text-sm">{openSeaData?.minted}</span>
							</div>
							<div className="inline-flex items-center justify-between w-full border-b-[0.25px] border-b-neutral-800 pb-0.5 mx-2">
								<span className="font-thin font-serif text-neutral-600 mr-1 text-sm">owners:</span>
								<span className="uppercase font-serif text-neutral-500 text-sm">{openSeaData?.numOfOwners}</span>
							</div>
							<div className="inline-flex items-center justify-between w-full border-b-[0.25px] border-b-neutral-800 pb-0.5 mx-2">
								<span className="font-thin font-serif text-neutral-600 mr-1 text-sm">volume:</span>
								<span className="uppercase font-serif text-neutral-500 text-sm">
									{openSeaData.totalVolume.toFixed(3)} <span className="font-thin font-serif">ETH</span>
								</span>
							</div>
							<div className="flex justify-center items-center gap-x-2 py-3 mt-2">
								<a target={"_blank"} href={tapeData?.links?.opensea} className="text-neutral-500 text-lg">
									<i className="fak fa-opensea"></i>
								</a>
								<a target={"_blank"} href={tapeData?.links?.etherscan} className="text-neutral-500 text-lg">
									<i className="fak fa-etherscan"></i>
								</a>
								{tapeData?.links?.splits && <a target={"_blank"} href={tapeData?.links?.splits} className="text-lg rounded-full border-neutral-700 border-[0.25px] bg-neutral-500 p-[0.095rem]">
									<SplitsIcon />
								</a>}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default TapeInfo;
