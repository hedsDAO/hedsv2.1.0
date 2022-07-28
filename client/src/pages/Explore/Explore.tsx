import React, { useEffect, Fragment } from "react";
import { Dispatch, RootState } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import Artists from "../../components/Explore/Artists/Artists";
import Spotlight from "../../components/Explore/Spotlight/Spotlight";
import Tapes from "../../components/Explore/Tapes/Tapes";

const Explore = () => {
	const dispatch = useDispatch<Dispatch>();
	const exploreData = useSelector((state: RootState) => state.exploreModel);
	const hedsTapes = useSelector((state: RootState) => state.spaceModel)?.hedstape;
	useEffect(() => {
		dispatch.spaceModel.getSpaceData();
		dispatch.exploreModel.getSpotlightData();
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
					</div>
					<Tapes {...hedsTapes} />
					<Artists />
				</Fragment>
			)}
		</div>
	);
};

export default Explore;
