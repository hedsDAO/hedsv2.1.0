import React from "react";
import { TapeData } from "../../../models/spaceModel";
import { ExploreState } from "../../../models/exploreModel";
import LinkButton from "../../../common/button/LinkButton/LinkButton";
import HedDot from "../../../../../public/heddot.png";

interface SpotlightProps {
	featured: TapeData;
	exploreData: ExploreState;
}
const Spotlight: React.FC<SpotlightProps> = ({ featured, exploreData }: SpotlightProps) => {
	const { space, tape, id } = exploreData.spotlight;
	return (
		<div className="col-span-12 bg-gray-300 dark:bg-neutral-800 rounded-xl lg:max-w-[100rem] p-2 mx-2 xl:mx-auto xl:my-5 shadow-sm">
			<div className="lg:z-10 lg:relative py-7 lg:py-10 2xl:mx-auto spotlight-gradient shadow-sm lg:max-w-[110rem] rounded-lg">
				<div className="mx-auto max-w-4xl px-4 py-1 xl:py-4 rounded-sm">
					<div className="grid lg:grid-cols-2 items-center gap-x-4 place-content-center">
						<div className="lg:col-span-1 flex flex-col items-center justify-center lg:items-end lg:justify-end max-w-[100%]">
							<img
								className="hidden lg:inline lg:w-full lg:h-full rounded-lg shadow-md"
								src={featured?.tape?.image}
							/>
						</div>
						<div className="lg:col-span-1 h-full flex items-center justify-center lg:justify-start">
							<div className="flex flex-col justify-center items-center lg:items-start px-20 mt-0 lg:mt-5">
								<div className="flex -space-x-2 overflow-hidden mb-4">
									<img src={featured?.sample?.image} className="h-16 lg:h-20 w-16 lg:w-20 inline-block rounded-full" />
									<img src={HedDot} className="h-16 lg:h-20 w-16 lg:w-20 inline-block rounded-full bg-neutral-900 p-2 xl:p-3" />
									<img src={featured?.tape?.image} className="h-16 lg:h-20 w-16 lg:w-20 inline-block rounded-full lg:hidden lg:opacity-0" />
								</div>
								<div className="inline-flex items-center">
									<span className="dark:text-neutral-200 text-neutral-300 font-serif text-xs mt-2 mb-1 tracking-widest whitespace-nowrap pr-1 py-1 mr-0.5 font-medium">
										heds
									</span>
									<span className="dark:text-neutral-200 text-neutral-300 font-serif text-xs mt-2 mb-1 tracking-widest whitespace-nowrap pr-1 py-1 mr-0.5 font-medium">
										/
									</span>
									<span className="dark:text-neutral-200 text-neutral-300 font-serif text-xs mt-2 mb-1 tracking-widest whitespace-nowrap pr-1 py-1 mr-0.5 font-medium">
										hedsTAPE
									</span>
									<span className="dark:text-neutral-200 text-neutral-300 font-serif text-xs mt-2 mb-1 tracking-widest whitespace-nowrap pr-1 py-1 mr-0.5 font-medium">
										/
									</span>
									<span className="dark:text-neutral-200 text-neutral-300 font-serif text-xs mt-2 mb-1 tracking-widest whitespace-nowrap pr-1 py-1 mr-0.5 font-medium">
										{+id + 1}
									</span>
								</div>
								<span className="dark:text-neutral-200 text-neutral-100 text-2xl uppercase tracking-widest mb-4 whitespace-nowrap font-semibold">
									{featured?.sample?.artist} <span className="lowercase">x</span> Heds
								</span>
								<span className="dark:text-neutral-200 text-neutral-200 mb-6 text-sm tracking-widest lg:text-left text-center">
									{exploreData?.spotlight?.description}
								</span>
								<LinkButton bg="bg-neutral-200 dark:bg-neutral-800 bg-opacity-100 dark:hover:bg-neutral-900 rounded-md transition-all" link={`/listen/${space}/${tape}/${featured?.tape?.no}`}>
									{exploreData?.spotlight?.text}
								</LinkButton>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Spotlight;
