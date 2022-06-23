import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
// import { TapeStatus } from "../../models/common";
// import CustomBadge from "../../common/badges/CustomBadge/CustomBadge";

const TapeListContainer = () => {
	const globalTapesData = useSelector((state: RootState) => state.globalTapesModel);
	const { hedstapes } = globalTapesData;
	return (
		<div className="w-screen px-5 mx-auto md:my-10 pb-10">
			<p className="uppercase text-4xl font-thin text-neutral-400 mt-1 mb-3 sm:mb-4 text-center">Season 1</p>
			<div className="flex items-center justify-center md:flex-row flex-col">
				{hedstapes &&
					hedstapes?.map((tape: any) => {
						if (tape.season === 1)
							return (
								<div className="max-w-[50%] md:max-w-[18em] md:mr-1">
									<Link to={tape.links.heds} key={tape.name}>
										<img
											src={tape.image}
											alt={tape.name}
											className="w-full md:w-3/12 my-2 md:min-w-[18em] object-cover"
										/>
										<h1 className="text-neutral-400 font-serif text-sm font-extralight sm:text-base sm:tracking-widest my-auto whitespace-nowrap pl-4">
											{tape.name.split(" ")[1]}
										</h1>
									</Link>
								</div>
							);
					})}
			</div>
			<p className="uppercase text-4xl font-thin text-neutral-400 mt-4 mb-3 sm:mb-4 text-center">Season 2</p>
			<div className="flex items-center justify-center md:flex-row flex-col">
				{hedstapes &&
					hedstapes?.map((tape: any) => {
						if (tape.season === 2)
							return (
								<div className="max-w-[50%] md:max-w-[18em] md:mr-1">
									<Link to={tape.links.heds} key={tape.name}>
										<img
											src={tape.image}
											alt={tape.name}
											className="w-full md:w-3/12 my-2 md:min-w-[18em] object-cover"
										/>
										<h1 className="text-neutral-400 font-serif text-sm font-extralight sm:text-base sm:tracking-widest my-auto whitespace-nowrap pl-4">
											{tape.name.split(" ")[1]}
										</h1>
									</Link>
								</div>
							);
					})}
			</div>
		</div>
	);
};

export default TapeListContainer;
