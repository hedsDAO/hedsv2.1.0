import React, { Fragment, useEffect } from "react";
import { RootState } from "../../../store";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { TapeData } from "../../../models/spaceModel";
import { useParams } from "react-router";
import { TapeStatus } from "../../../models/common";

const Related = () => {
	const { tape, id } = useParams<{ tape: string; id: string }>();
	const hedsTapes = useSelector((state: RootState) => state.spaceModel?.[tape]);
	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, [id]);
	return (
		<Fragment>
			{hedsTapes?.length && (
				<div className="flex flex-col justify-center items-center rounded-lg mt-10 mb-10 lg:mx-auto mx-2">
					<div className="text-neutral-600 dark:text-neutral-500 text-center font-semibold tracking-wide text-xl mb-2 lg:mb-5">RELATED TAPES</div>
					<div className="flex lg:flex-row flex-col items-evenly gap-1 p-1 rounded-md">
						{hedsTapes &&
							hedsTapes?.map((tape: TapeData, index: number) => {
								if (+id - 1 != tape?.tape?.id && +tape?.status?.status >= TapeStatus?.MINT_CLOSE)
									return (
										<Link key={tape.links.route + index} to={tape.links.route}>
											<div key={tape.tape.contract + tape.tape.image} className="flex lg:flex-row flex-col items-start justify-between lg:bg-transparent lg:p-0 p-1 gap-y-1 rounded-md">
												<div className="overflow-hidden lg:aspect-none transition-all rounded-md max-h-10 lg:min-w-[10rem] lg:min-h-[10rem] lg:max-h-[10rem] lg:max-w-[10rem] object-contain">
													<img
														src={tape.tape.image}
														className={`w-full h-full object-center object-cover lg:w-[11rem] lg:h-[11rem] group-hover:grayscale-0`}
													/>
												</div>
												<div className="lg:hidden ml-0.5 z-20 dark:text-neutral-400 text-neutral-600 font-semibold text-xs tracking-wide text-center">{tape.tape.name}</div>
											</div>
										</Link>
									);
							})}
					</div>
				</div>
			)}
		</Fragment> 
	);
};

export default Related;
