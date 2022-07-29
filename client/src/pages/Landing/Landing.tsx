import React, { useEffect, Fragment } from "react";
import { Dispatch, RootState } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import TextBlock from "../../components/Landing/TextBlock/TextBlock";
import LinkButton from "../../common/button/LinkButton/LinkButton";
import LandingHead from "../../components/Landing/LandingHead/LandingHead";
import VideoContainer from "../../components/Landing/VideoContainer/VideoContainer";

const Landing = () => {
	const dispatch = useDispatch<Dispatch>();
	const landingData = useSelector((state: RootState) => state.landingModel);
	useEffect(() => {
		dispatch.landingModel.getLandingData();
	}, []);
	return (
		<div className="bg-[#f2f0e9] w-screen h-screen overflow-hidden">
			{landingData && (
				<Fragment>
					<div className="absolute right-12 bottom-1/3 md:bottom-[40%] md:right-[20%] z-30 px-5 pb-5">
						<TextBlock
							tapeName={landingData?.textBlock?.tapeName}
							tapeTag={landingData?.textBlock?.tapeTag}
							artistName={landingData?.textBlock?.artistName}
							artistTag={landingData?.textBlock?.artistTag}
						/>
						<div className="flex justify-end lg:justify-start items-center md:w-auto mt-8">
							<div className="flex flex-col items-start gap-y-2">
								<LinkButton bg={"bg-neutral-100 dark:bg-neutral-900 shadow-sm border border-neutral-900 dark:border-transparent rounded-none "} link={landingData?.linkButton?.link}>
									{landingData?.linkButton?.text}
								</LinkButton>
							</div>
						</div>
					</div>
					<VideoContainer src={landingData?.media?.lg} size="sm" />
					<LandingHead src={landingData?.media?.md} />
					<VideoContainer src={landingData?.media.sm} placeholder="https://firebasestorage.googleapis.com/v0/b/heds-34ac0.appspot.com/o/landing%2FScreen%20Shot%202022-07-29%20at%2010.34.49%20AM.png?alt=media&token=3c77cbbc-3eb6-45f3-8e4e-1f9b30cf6d68" size="lg" />
				</Fragment>
			)}
		</div>
	);
};

export default Landing;
