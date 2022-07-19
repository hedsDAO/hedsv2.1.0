import React, { useEffect, Fragment } from "react";
import { TapeData } from "../../../models/spaceModel";
import { useParams } from "react-router";
import SplitsIcon from "../../../common/svg/SplitsIcon/SplitsIcon";
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
		<div className="col-span-12 lg:col-span-3 h-full p-1 bg-neutral-975 rounded-lg">
			<div className="grid grid-cols-1 lg:grid-cols-1 rounded-md h-full w-full">
				<div className="flex flex-col justify-evenly gap-1 p-1.5 h-full rounded-md">
					<div className="flex flex-col items-center justify-evenly rounded-md bg-neutral-950 h-full w-full px-5 lg:py-0 py-5">
						<h3 className="text-neutral-400 uppercase font-semibold tracking-wide">TAPE DETAILS</h3>
						<div className="py-2 px-3 rounded-md flex flex-col min-w-[85%] gap-y-2">
							<div className="inline-flex items-center justify-between w-full">
								<span className="font-thin font-serif text-neutral-600 text-sm">status</span>
								<span
									className="uppercase font-serif text-neutral-500 text-sm"
									style={{ color: generateStatusColors(tapeData?.status?.status) }}>
									{generateStatusLanguage(tapeData?.status?.status)}
								</span>
							</div>
							<div className="inline-flex items-center justify-between w-full">
								<span className="font-thin font-serif text-neutral-600 text-sm">space</span>
								<span className="uppercase font-serif text-neutral-500 text-sm">{space || "heds"}</span>
							</div>
							<div className="inline-flex items-center justify-between w-full">
								<span className="font-thin font-serif text-neutral-600 text-sm">tape</span>
								<span className="uppercase font-serif text-neutral-500 text-sm">{tape}</span>
							</div>
							<div className="inline-flex items-center justify-between w-full">
								<span className="font-thin font-serif text-neutral-600 text-sm">no</span>
								<span className="uppercase font-serif text-neutral-500 text-sm">{id}</span>
							</div>
							<div className="inline-flex items-center justify-between w-full">
								<span className="font-thin font-serif text-neutral-600 text-sm">bpm</span>
								<span className="uppercase font-serif text-neutral-500 text-sm">{tapeData?.sample?.bpm}</span>
							</div>
							{openSeaData && (
								<Fragment>
									<div className="inline-flex items-center justify-between w-full">
										<span className="font-thin font-serif text-neutral-600 text-sm">voting power</span>
										<span className="uppercase font-serif text-neutral-500 text-sm">{openSeaData?.calculatedVP}</span>
									</div>
									<div className="inline-flex items-center justify-between w-full">
										<span className="font-thin font-serif text-neutral-600 text-sm">minted</span>
										<span className="uppercase font-serif text-neutral-500 text-sm">{openSeaData?.minted}</span>
									</div>
									<div className="inline-flex items-center justify-between w-full">
										<span className="font-thin font-serif text-neutral-600 text-sm">owners</span>
										<span className="uppercase font-serif text-neutral-500 text-sm">{openSeaData?.numOfOwners}</span>
									</div>
									<div className="inline-flex items-center justify-between w-full">
										<span className="font-thin font-serif text-neutral-600 text-sm">volume</span>
										<span className="uppercase font-serif text-neutral-500 text-sm">
											{openSeaData.totalVolume.toFixed(3)} <span className="font-thin font-serif">ETH</span>
										</span>
									</div>
								</Fragment>
							)}
						</div>
						<div className="flex justify-center items-center gap-x-2">
							<a target={"_blank"} href={tapeData?.links?.opensea} className="text-neutral-500 text-lg">
								<i className="fak fa-opensea"></i>
							</a>
							<a target={"_blank"} href={tapeData?.links?.etherscan} className="text-neutral-500 text-lg">
								<i className="fak fa-etherscan"></i>
							</a>
							{tapeData?.links?.splits && (
								<a
									target={"_blank"}
									href={tapeData?.links?.splits}
									className="text-lg rounded-full border-neutral-700 border-[0.25px] bg-neutral-500 p-[0.095rem]">
									<SplitsIcon />
								</a>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TapeInfo;
