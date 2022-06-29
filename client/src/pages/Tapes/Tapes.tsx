import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
// import TapesToggle from "../../common/toggles/TapesToggle/TapesToggle";
import TapeCard from "../../common/cards/TapeCard/TapeCard";
import GhostLoader from "../../common/wrappers/GhostLoader/GhostLoader";

const Tapes = () => {
	const globalTapesData = useSelector((state: RootState) => state.globalTapesModel);
	const { hedstapes } = globalTapesData;
	return (
		<GhostLoader>
			<div className="w-screen md:mt-16 mt-11 pb-56">
				<div className=" lg:pb-0 lg:z-10 lg:relative py-3 lg:py-5">
					<div className="lg:mx-auto lg:max-w-7xl lg:px-6 lg:grid lg:grid-cols-5 lg:gap-2">
						<div className="flex justify-center lg:col-span-2 lg:-my-20 px-2 lg:py-5 py-4">
							<div className="flex flex-col">
								{hedstapes?.slice(0, -1)?.map((tape) => {
									if (tape.season === 2) {
										return (
											<div className="">
												<TapeCard tape={tape} featured />
											</div>
										);
									}
								})}
							</div>
						</div>
						<div className="mt-2 sm:mt-4 lg:m-0 lg:col-span-3">
							<div className="mx-auto max-w-md px-2 sm:max-w-2xl lg:py-10 lg:max-w-none">
								<div className="flex flex-col md:justify-start justify-center">
									<div className="mt-6 lg:mt-0 text-3xl font-thin font-serif text-neutral-300 text-center md:text-left">
										<span className="rounded-sm py-0.5">hedsTAPE 06</span>
									</div>
									<div className="lg:py-2 py-1.5 bg-opacity-60 text-neutral-400 mt-2 text-center md:text-left md:px-0 px-3">
										Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
										et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
										aliquip ex ea commodo consequat.
									</div>
									<button className="flex items-center md:mx-0 mx-auto justify-between w-36 md:w-36 font-base  py-2 px-5 text-neutral-200 bg-fuchsia-900 bg-opacity-40 font-sans uppercase rounded-md text-sm group my-5">
										<Link to="/listen/hedstape/5">
											<p className="text-sm text-neutral-200 md:tracking-widest">VIEW TAPE</p>
										</Link>
										<i className="fa-regular fa-angles-right ml-2 group-hover:ml-3 transition-all text-xs mt-0.5"></i>
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="sm:max-w-7xl w-full mx-auto mt-20 my-10">
					<div className="flex justify-center mx-auto uppercase text-neutral-300 tracking-widest text-5xl animate__animated animate__fadeInUp">
						Explore
					</div>
					<div className="flex justify-center mx-auto uppercase font-thin text-neutral-400 tracking-widest text-2xl animate__animated animate__fadeInUp">
						the tapes
					</div>
				</div>
				{/* <TapesToggle /> */}
				<hr className="sm:max-w-7xl w-full mx-auto border-[0.25px] border-neutral-600 mb-10 mt-5" />
				<div className="grid grid-cols-2 mx-auto lg:grid-cols-6 sm:max-w-7xl lg:max-w-6xl lg:gap-3 items-center px-3 py-5 lg:p-5">
					{hedstapes?.map((tape) => {
						return (
							<div className="mx-2 lg:mx-0.25">
								<TapeCard tape={tape} />
							</div>
						);
					})}
				</div>
			</div>
		</GhostLoader>
	);
};
export default Tapes;
