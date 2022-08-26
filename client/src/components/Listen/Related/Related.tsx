import React, { Fragment, useEffect } from "react";
import { RootState } from "../../../store";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { TapeData } from "../../../models/spaceModel";
import { useParams } from "react-router";

const Related = () => {
	const { tape, id } = useParams<{ tape: string; id: string }>();
	const tapeData = useSelector((state: RootState) => state.spaceModel);
	const tapeContent = Object.values(tapeData).map((tape) => Object.values(tape));
	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, [tape, id]);
	return (
		<Fragment>
			{tapeContent && Object?.values?.(tapeContent)?.length && (
				<div className="flex flex-col justify-center items-center rounded-lg mt-10 mb-10 lg:mx-auto mx-2">
					<div className="text-neutral-600 dark:text-neutral-500 text-center font-semibold tracking-wide text-xl mb-2 lg:mb-5">RELATED TAPES</div>
					<div className="flex lg:grid lg:grid-cols-7 lg:place-items-center flex-col items-evenly gap-1 p-1">
						{tapeContent &&
							tapeContent.map((allTracks) => {
								return allTracks?.map((tape: TapeData, index) => {
									if (id != tape?.tape?.no) return (
										<Link key={tape.links.route + index} to={tape.links.route}>
											<div key={tape.tape.contract + tape.tape.image} className="group flex lg:col-span-1 flex-col items-start justify-between lg:bg-transparent lg:p-0 p-1 gap-y-1 rounded-sm transition-all ease-in-out">
												<div className="overflow-hidden lg:aspect-none transition-all rounded-sm max-h-10 lg:min-w-[8rem] lg:min-h-[8rem] lg:max-h-[8rem] lg:max-w-[8rem] object-contain">
													<img
														src={tape.tape.image}
														className={`w-full h-full object-center object-cover lg:w-[9rem] lg:h-[9rem] group-hover:grayscale transition-all ease-in-out`}
													/>
												</div>
												<div className="lg:text-[0.65rem] lg:font-normal ml-0.5 z-20 dark:text-neutral-400 text-neutral-600 font-semibold text-xs tracking-wide text-center">{tape.tape.name}</div>
											</div>
										</Link>
									);
								})
							})}
					</div>
				</div>
			)}
		</Fragment>
	);
};

export default Related;
