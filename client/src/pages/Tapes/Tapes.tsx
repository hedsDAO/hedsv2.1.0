import React, { useEffect, Fragment } from "react";
import { Dispatch, RootState } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import Spotlight from "../../components/Tapes/Spotlight/Spotlight";

const Tapes = () => {
	const dispatch = useDispatch<Dispatch>();
	const spaceData = useSelector((state: RootState) => state.spaceModel);
	const globalData = useSelector((state: RootState) => state.globalModel);
	const hedsTapes = spaceData?.hedstape;
	useEffect(() => {
		dispatch.spaceModel.getSpaceData();
		dispatch.globalModel.getGlobalData();
	}, []);
	return (
		<Fragment>
			{hedsTapes?.length && globalData?.spotlight && (
				<Fragment>
					<Spotlight featured={hedsTapes?.[globalData?.spotlight?.tape]} globalData={globalData} />
					<div className="max-w-6xl mx-auto bg-neutral-900 h-full">
						<div className="max-w-6xl mb-5 mx-auto flex flex-col lg:items-start items-center">
							<div className="uppercase text-neutral-300 tracking-widest text-4xl animate__animated animate__fadeInUp">
								Explore
							</div>
							<div className="uppercase text-neutral-400 tracking-widest text-xl animate__animated animate__fadeInUp">
								the tapes
							</div>
						</div>
						<hr className="max-w-6xl mx-auto border-[0.25px] border-neutral-700" />
						<div className="max-w-6xl mx-auto py-5">
							<div className="mx-auto">
								<ul role="list" className="grid grid-cols-2 gap-x-2 gap-y-2 sm:grid-cols-2 lg:grid-cols-4 lg:px-0 px-2">
									{hedsTapes?.map((tape) => {
										return (
											<li key={tape?.links?.route} className="relative">
												<div className="group w-full block aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
													<img
														src={tape?.tape?.image}
														alt=""
														className="object-cover pointer-events-none group-hover:opacity-75"
													/>
													<button type="button" className="absolute inset-0 focus:outline-none">
														<span className="sr-only">View details for {tape?.tape.name}</span>
													</button>
												</div>
											</li>
										);
									})}
								</ul>
							</div>
						</div>
					</div>
				</Fragment>
			)}
		</Fragment>
	);
};

export default Tapes;
