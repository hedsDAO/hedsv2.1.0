import React, { useEffect, Fragment } from "react";
import { Dispatch, RootState } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import { TapeData } from "../../models/spaceModel";
import { Link } from "react-router-dom";
// import GhostLoader from "../../common/wrapper/GhostLoader/GhostLoader";
import TapesToggle from "../../common/toggles/TapesToggle/TapesToggle";
import Spotlight from "../../components/Explore/Spotlight/Spotlight";

const Explore = () => {
	const dispatch = useDispatch<Dispatch>();
	const spaceData = useSelector((state: RootState) => state.spaceModel);
	const exploreData = useSelector((state: RootState) => state.exploreModel);
	const hedsTapes = spaceData?.hedstape;
	useEffect(() => {
		dispatch.spaceModel.getSpaceData();
		dispatch.exploreModel.getExploreData();
	}, []);
	return (
		<div className="min-h-screen">
			{hedsTapes?.length && exploreData?.spotlight && (
				<Fragment>
					<Spotlight featured={hedsTapes?.[exploreData?.spotlight?.id]} exploreData={exploreData} />
					<div className="xl:max-w-7xl flex lg:flex-row flex-col justify-between mx-auto items-center xl:items-end pb-5 lg:px-1 px-6 gap-y-4 mt-10 xl:mt-20">
						<div className="xl:mx-0 mx-2 xl:my-0 my-5 text-center lg:text-left">
							<h1 className="text-4xl tracking-wide font-extrabold text-neutral-300">EXPLORE</h1>
							<p className="mt-3 text-sm lg:text-base text-neutral-500 xl:whitespace-nowrap xl:max-w-full max-w-sm">
								Listen to the collaborative collections curated by artists, heds and the community.
							</p>
						</div>
						<TapesToggle />
					</div>
					<div className="grid grid-cols-12 max-w-7xl mx-auto w-full gap-x-2 lg:px-0 px-1">
						<div className="col-span-12 bg-neutral-950 border-[0.25px] border-neutral-800 rounded-lg mt-4">
							<div className="grid grid-cols-2 xl:grid-cols-6 place-items-center items-center gap-y-2 gap-x-2 m-2">
								<>
									{hedsTapes &&
										hedsTapes?.map((tape: TapeData) => (
											<div key={tape.tape.contract + tape.tape.name} className="group relative">
												<Link to={tape.links.route}>
													<div className="overflow-hidden group-hover:opacity-50 lg:aspect-none transition-all rounded-md">
														<img
															src={tape.tape.image}
															className={`w-full h-full object-center object-cover lg:w-full lg:h-full group-hover:grayscale-0`}
														/>
													</div>
												</Link>
											</div>
										))}
								</>
							</div>
						</div>
					</div>
				</Fragment>
			)}
		</div>
	);
};

export default Explore;
