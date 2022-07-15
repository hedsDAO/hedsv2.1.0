import React, { Fragment, useEffect } from "react";
import { RootState } from "../../../store";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { TapeData } from "../../../models/spaceModel";
import { useParams } from "react-router";

const Related = () => {
	const { tape, id } = useParams<{ tape: string; id: string }>();
	const hedsTapes = useSelector((state: RootState) => state.spaceModel?.[tape]);
	useEffect(() => {
		window.scrollTo({top: 0, behavior: "smooth"});
	}, [id]);
	return (
		<Fragment>
			{hedsTapes?.length && (
				<div className="flex flex-col justify-center items-center rounded-lg mx-auto mt-20">
					<div className="text-neutral-400 text-center font-semibold tracking-wide text-xl mb-5">RELATED TAPES</div>
					<div className="bg-neutral-950 flex space-x-2">
						{hedsTapes &&
							hedsTapes?.map((tape: TapeData) => {
								if (+id - 1 != tape?.tape?.id)
									return (
										<div key={tape.tape.contract + tape.tape.image} className="group">
											<Link to={tape.links.route}>
												<div className="overflow-hidden group-hover:opacity-50 lg:aspect-none transition-all rounded-md min-w-[10rem] min-h-[10rem] max-h-[10rem] max-w-[10rem]">
													<img
														src={tape.tape.image}
														className={`w-full h-full object-center object-cover lg:w-[10rem] lg:h-[10rem] group-hover:grayscale-0`}
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
