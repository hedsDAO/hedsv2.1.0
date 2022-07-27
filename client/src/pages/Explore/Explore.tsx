import React, { useEffect, Fragment } from "react";
import { Dispatch, RootState } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import { TapeData } from "../../models/spaceModel";
import { Link } from "react-router-dom";
import Artists from "../../components/Explore/Artists/Artists";
// import TapesToggle from "../../common/toggles/TapesToggle/TapesToggle";
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
					<div className="xl:max-w-7xl flex flex-col lg:flex-row justify-center items-center lg:items-baseline gap-x-2 mx-auto mb-5 px-2">
						<h1 className="text-4xl lg:text-5xl tracking-wide font-extrabold text-neutral-800 dark:text-neutral-300 animate__animated animate__fadeInLeft">FEATURED </h1>
						<h5 className="text-2xl lg:text-3xl font-light dark:text-neutral-400 text-neutral-800 animate__animated animate__fadeInRight">{hedsTapes?.[exploreData?.spotlight?.id]?.tape?.name}</h5>
					</div>
					<Spotlight featured={hedsTapes?.[exploreData?.spotlight?.id]} exploreData={exploreData} />
					<div className="xl:max-w-7xl flex lg:flex-row flex-col justify-between mx-auto items-center xl:items-end pb-3 lg:px-1 px-6 gap-y-4 mt-5 xl:mt-14">
						<div className="xl:mx-0 mx-2 xl:my-0 my-5 text-center lg:text-left">
							<h1 className="text-4xl tracking-wide font-extrabold text-neutral-950 dark:text-neutral-300">EXPLORE</h1>
							<p className="mt-3 text-sm lg:text-base text-neutral-500 xl:whitespace-nowrap xl:max-w-full max-w-sm">
								Listen to the collaborative collections curated by artists, heds and the community.
							</p>
						</div>
						{/* <TapesToggle /> */}
					</div>
					<div className="grid grid-cols-12 max-w-7xl mx-auto w-full gap-x-2 px-3">
						<div className="col-span-12 rounded-lg mt-4">
							<div className="grid grid-cols-2 xl:grid-cols-6 place-items-center items-center gap-y-1 gap-x-1">
								<>
									{hedsTapes &&
										hedsTapes?.map((tape: TapeData) => (
											<div key={tape.tape.contract + tape.tape.name} className="relative bg-neutral-300 dark:bg-neutral-975 hover:bg-neutral-400 dark:hover:bg-neutral-850 transition-all p-2 rounded-md">
												<Link to={tape.links.route}>
													<div className="overflow-hidden lg:aspect-none transition-all rounded-md flex flex-col gap-y-2">
														<img
															src={tape.tape.image}
															className={`w-full h-full object-center object-cover lg:w-full lg:h-full group-hover:grayscale-0 rounded-md mb-1`}
														/>
														<div className="text-neutral-900 dark:text-neutral-300 text-sm font-semibold pl-1.5 tracking-wide pb-1 transition-all">{tape?.tape?.name}</div>
													</div>
												</Link>
											</div>
										))}
								</>
							</div>
						</div>
					</div>
					<Artists />
				</Fragment>
			)}
		</div>
	);
};

export default Explore;
