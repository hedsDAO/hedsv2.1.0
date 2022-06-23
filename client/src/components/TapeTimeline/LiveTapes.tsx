import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { TapeData } from "../../models/globalTapesModel";
import TapeStatusBadge from "../../common/badges/TapeStatusBadge/TapeStatusBadge";

const LiveTapes = () => {
	const globalTapesData = useSelector((state: RootState) => state.globalTapesModel);
	return (
		<div className="px-5 pt-10 flex-shrink-0">
			<h1 className="rounded-none font-thin text-neutral-300 font-sans flex justify-start items-center py-2 mb-2 px-3">
				<i className="fa-solid fa-circle text-red-500 text-xs animate-blinker mr-2"></i>
				<span className="font-serif ml-2 uppercase tracking-widest text-neutral-400 font-extralight px-1">LIVE TAPE</span>
			</h1>
			<div className="flex">
				{globalTapesData?.hedstapes?.length &&
					globalTapesData?.hedstapes?.map((tape: TapeData) => {
						if (tape?.status < 8 && tape?.status > 1) {
							return (
								<div
									key={tape.contract}
									className="flex flex-col items-center sm:mx-2 mx-1 border border-neutral-800 transition-all rounded-sm px-5 sm:px-8 py-4">
									<div className="text-neutral-400 flex my-auto">
										<div className="font-serif text-xs sm:text-base font-extralight whitespace-nowrap">{tape.name}</div>
									</div>
									<div className="my-3">
										<TapeStatusBadge status={tape.status} link={tape.links.heds || ""} />
									</div>
								</div>
							);
						}
					})}
			</div>
		</div>
	);
};

export default LiveTapes;
