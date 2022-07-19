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
				<div className="flex flex-col justify-center items-center rounded-lg mx-auto mt-20 mb-10">
					<div className="text-neutral-500 text-center font-semibold tracking-wide text-xl mb-2 lg:mb-5">RELATED TAPES</div>
					<div className="lg:bg-neutral-950 flex lg:flex-row flex-col items-center space-y-1 lg:space-x-2">
						{hedsTapes &&
							hedsTapes?.map((tape: TapeData) => {
								if (+id - 1 != tape?.tape?.id && +tape?.status?.status >= TapeStatus?.MINT_CLOSE)
									return (
										<div key={tape.tape.contract + tape.tape.image} className="group lg:mx-0 mx-4">
											<Link to={tape.links.route}>
												<div className="text-neutral-400 font-semibold inline-block relative top-8 left-4 z-40 lg:hidden">
													{tape?.tape?.name}
												</div>
												<div className="overflow-hidden group-hover:opacity-75 opacity-50 lg:opacity-100 lg:aspect-none transition-all rounded-md max-h-20 lg:min-w-[11rem] lg:min-h-[11rem] lg:max-h-[11rem] lg:max-w-[11rem]">
													<img
														src={tape.tape.image}
														className={`w-full h-full object-center object-cover lg:w-[11rem] lg:h-[11rem] group-hover:grayscale-0`}
													/>
												</div>
											</Link>
										</div>
									);
							})}
					</div>
				</div>
			)}
		</Fragment>
	);
};

export default Related;
