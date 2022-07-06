import React from "react";
import { TapeData } from "../../../models/spaceModel";
import { GlobalState } from "../../../models/globalModel";
import LinkButton from "../../../common/button/LinkButton/LinkButton";

interface SpotlightProps {
	featured: TapeData;
	globalData: GlobalState;
}
const Spotlight: React.FC<SpotlightProps> = ({ featured, globalData }: SpotlightProps) => {
	return (
		<div className="bg-neutral-950 lg:z-10 lg:relative py-10 lg:py-12 lg:my-1 mt-10 border-[0.25px] border-neutral-800 mx-auto">
			<div className="mx-auto max-w-4xl px-4 py-4 rounded-lg">
				<div className="grid lg:grid-cols-2 items-center gap-x-4 place-content-center">
					<div className="lg:col-span-1 flex flex-col items-end justify-end">
						<img className="rounded-sm shadow-sm" src={featured?.tape?.image} />
						<h3 className="text-sm bg-opacity-25 text-neutral-300 tracking-widest mt-2 -ml-0.5 rounded-sm font-serif font-semibold bg-black border-[0.5px] border-neutral-800 px-2 py-0.5 md:py-1 self-start">
							FEATURED
						</h3>
					</div>
					<div className="lg:col-span-1 h-full flex items-center justify-center lg:justify-start">
						<div className="flex flex-col justify-center items-center lg:items-start px-20 lg:mt-0 mt-10">
							<div className="flex -space-x-2 overflow-hidden mb-4">
								<img src={featured?.sample?.image} className="h-20 w-20 inline-block rounded-full" />
								<img src={featured?.collab?.image} className="h-20 w-20 inline-block rounded-full" />
							</div>
							<span className="text-neutral-100 font-serif font-thin text-xl mt-1 tracking-widest mb-1">
								{featured?.tape?.name}
							</span>
							<span className="text-neutral-300 text-lg font-thin uppercase tracking-widest mb-2">
								{featured?.sample?.artist} x Heds
							</span>
							<span className="text-neutral-400 mb-6 text-sm font-thin tracking-widest lg:text-left text-center">
								{globalData?.spotlight?.description}
							</span>
							<LinkButton bg="bg-fuchsia-900" link={featured?.links?.route}>
								{globalData?.spotlight?.text}
							</LinkButton>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Spotlight;
