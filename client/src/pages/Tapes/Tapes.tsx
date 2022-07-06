import React, { useEffect, Fragment } from "react";
import { Dispatch, RootState } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import { TapeData } from "../../models/spaceModel";
import { Link } from "react-router-dom";
import TapesToggle from "../../common/toggles/TapesToggle/TapesToggle";
import emptyState from "../.././../../public/2.png";
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
					<div className="col-span-12 lg:col-span-9 bg-neutral-950 border-[0.25px] border-neutral-800 rounded-lg mx-auto max-w-[100rem] mt-4">
						<div className="flex justify-between max-w-[100rem] mx-auto w-full bg-neutral-900 uppercase rounded-t-lg py-2 px-3">
							<div className="text-left text-2xl text-neutral-500 tracking-wider">EXPLORE</div> <TapesToggle />
						</div>
						<div className="grid grid-cols-2 xl:grid-cols-5 place-items-center items-center gap-y-2 gap-x-2 m-2">
							<>
								{hedsTapes &&
									hedsTapes?.map((tape: TapeData) => (
										<>
											<div key={tape.tape.image} className="group relative">
												<Link to={tape.links.route}>
													<div className="overflow-hidden group-hover:opacity-50 opacity-75 lg:aspect-none transition-all rounded-md">
														<img
															src={tape.tape.image}
															className={`w-full h-full object-center object-cover lg:w-full lg:h-full group-hover:grayscale-0`}
														/>
													</div>
												</Link>
											</div>
										</>
									))}
								{["1", "2", "3", "4"].map((empty: string, i: number) => {
									return (
										<div key={"tapes" + i + empty} className="group relative">
											<div className="overflow-hidden group-hover:opacity-50 opacity-75 lg:aspect-none transition-all rounded-md">
												<img
													src={emptyState}
													className={`w-full h-full object-center object-cover lg:w-full lg:h-full group-hover:grayscale-0`}
												/>
											</div>
										</div>
									);
								})}
							</>
						</div>
					</div>
				</Fragment>
			)}
		</Fragment>
	);
};

export default Tapes;
