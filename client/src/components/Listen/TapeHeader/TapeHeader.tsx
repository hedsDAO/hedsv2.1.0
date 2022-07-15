import React from "react";
import { TapeData } from "../../../models/spaceModel";

const TapeHeader = (tapeData: TapeData) => {
	return (
		<div className="max-w-[100rem] lg:mx-auto rounded-lg mx-2 bg-neutral-975 p-2 lg:mt-10 mb-1.5">
			<div className="lg:z-10 max-w-[100rem] lg:mx-auto listen-gradient rounded-md py-8 lg:py-14">
				<div className="lg:max-w-6xl lg:px-1 lg:grid lg:grid-cols-5 lg:gap-2 lg:mx-auto items-center">
					<div className="flex justify-center lg:col-span-2 px-2">
						<img
							className="object-contain rounded-lg w-[85%] sm:w-[50%] lg:w-[18rem] bg-neutral-900"
							src={tapeData.tape?.image}
						/>
					</div>
					<div className="lg:col-span-3">
						<div className="grid grid-cols-12 gap-x-5 lg:max-w-lg mt-2 mx-5 sm:px-5 lg:items-start items-center">
							<div className="col-span-12 lg:px-0 px-2 lg:col-span-1 h-full flex items-center justify-center lg:justify-start">
								<div className="flex flex-col justify-start items-center lg:items-start lg:mt-0 mt-10">
									<div className="flex items-center justify-start mb-4">
										<img
											src={tapeData?.sample?.image}
											className="h-20 w-20 aspect-square inline-block rounded-full item item--sphere flex-shrink-0 flex-grow-0"
										/>
										<img
											src={tapeData?.collab?.image}
											className="h-20 w-20 aspect-square inline-block rounded-full bg-neutral-900 p-2 item item--sphere flex-shrink-0 flex-grow-0 -ml-2"
										/>
									</div>
									<div className="inline-flex items-center">
										<span className="text-neutral-300 font-serif text-xs mt-2 mb-1 tracking-widest whitespace-nowrap pr-1 py-1 mr-0.5">
											heds
										</span>
										<span className="text-neutral-300 font-serif text-xs mt-2 mb-1 tracking-widest whitespace-nowrap pr-1 py-1 mr-0.5">
											/
										</span>
										<span className="text-neutral-300 font-serif text-xs mt-2 mb-1 tracking-widest whitespace-nowrap pr-1 py-1 mr-0.5">
											hedTAPE
										</span>
										<span className="text-neutral-300 font-serif text-xs mt-2 mb-1 tracking-widest whitespace-nowrap pr-1 py-1 mr-0.5">
											/
										</span>
										<span className="text-neutral-300 font-serif text-xs mt-2 mb-1 tracking-widest whitespace-nowrap pr-1 py-1 mr-0.5">
											{tapeData?.tape?.no}
										</span>
									</div>
									<span className="text-neutral-100 text-2xl uppercase tracking-widest whitespace-nowrap mb-3">
										{tapeData?.sample?.artist} <span className="lowercase">x</span> Heds
									</span>
								</div>
							</div>
						</div>
						<div className="px-10 lg:max-w-xl ">
							<div className="flex flex-col md:items-start items-center">
								<div className="lg:px-0 px-5 bg-opacity-60 text-neutral-300 text-sm text-center md:text-left tracking-wider min-h-[75px] lg:pb-0 lg:pt-0 pb-10 pt-5">
									{tapeData.tape?.description}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TapeHeader;
