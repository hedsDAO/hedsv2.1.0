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
		<Fragment>
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
								<LinkButton bg={"bg-neutral-900"} link={landingData?.linkButton?.link}>
									{landingData?.linkButton?.text}
								</LinkButton>
							</div>
						</div>
					</div>
					<VideoContainer src={landingData?.media?.sm} size="sm" />
					<LandingHead src={landingData?.media?.md} />
					<VideoContainer src={landingData?.media.lg} size="lg" />
				</Fragment>
			)}
		</Fragment>
	);
};

export default Landing;
