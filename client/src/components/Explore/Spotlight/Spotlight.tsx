import React from "react";
import { TapeData } from "../../../models/spaceModel";
import { GlobalState } from "../../../models/globalModel";
import LinkButton from "../../../common/button/LinkButton/LinkButton";
import HedDot from "../../../../../public/heddot.png";

interface SpotlightProps {
	featured: TapeData;
	exploreData: GlobalState;
}
const Spotlight: React.FC<SpotlightProps> = ({ featured, exploreData }: SpotlightProps) => {
	const { space, tape, id } = exploreData.spotlight;
	return (
		<div className="lg:z-10 lg:relative py-8 lg:py-10 border-[0.25px] border-neutral-800 2xl:mx-auto mx-2 spotlight-gradient max-w-[110rem] rounded-lg my-5">
			<div className="mx-auto max-w-4xl px-4 py-4 rounded-lg">
				<div className="grid lg:grid-cols-2 items-center gap-x-4 place-content-center">
					<div className="lg:col-span-1 flex flex-col items-center lg:items-end lg:justify-end">
						<img className="max-w-xs md:max-w-md lg:w-full lg:h-full rounded-lg shadow-sm" src={featured?.tape?.image} />
					</div>
					<div className="lg:col-span-1 h-full flex items-center justify-center lg:justify-start">
						<div className="flex flex-col justify-center items-center lg:items-start px-20 lg:mt-0 mt-10">
							<div className="flex -space-x-2 overflow-hidden mb-4">
								<img src={featured?.sample?.image} className="h-20 w-20 inline-block rounded-full" />
								<img src={HedDot} className="h-20 inline-block rounded-full bg-neutral-900 p-3" />
							</div>
							<div className="inline-flex items-center">
								<span className="text-neutral-300 font-serif text-xs mt-2 tracking-widest mb-3 whitespace-nowrap pr-1 py-1 mr-0.5">
									heds
								</span>
								<span className="text-neutral-300 font-serif text-xs mt-2 tracking-widest mb-3 whitespace-nowrap pr-1 py-1 mr-0.5">
									/
								</span>
								<span className="text-neutral-300 font-serif text-xs mt-2 tracking-widest mb-3 whitespace-nowrap pr-1 py-1 mr-0.5">
									hedTAPE
								</span>
								<span className="text-neutral-300 font-serif text-xs mt-2 tracking-widest mb-3 whitespace-nowrap pr-1 py-1 mr-0.5">
									/
								</span>
								<span className="text-neutral-300 font-serif text-xs mt-2 tracking-widest mb-3 whitespace-nowrap pr-1 py-1 mr-0.5">
									5
								</span>
							</div>
							<span className="text-neutral-100 text-2xl uppercase tracking-widest mb-1 whitespace-nowrap">
								{featured?.sample?.artist} <span className="lowercase">x</span> Heds
							</span>
							<span className="text-neutral-200 mb-6 font-thin text-sm tracking-widest lg:text-left text-center">
								{exploreData?.spotlight?.description}
							</span>
							<LinkButton bg="bg-neutral-900 bg-opacity-100" link={`/listen/${space}/${tape}/${id}`}>
								{exploreData?.spotlight?.text}
							</LinkButton>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Spotlight;
