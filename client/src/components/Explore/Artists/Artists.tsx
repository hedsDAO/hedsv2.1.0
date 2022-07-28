import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Dispatch, RootState } from "../../../store";

const Artists = () => {
	const dispatch = useDispatch<Dispatch>();
	const audioData = useSelector((state: RootState) => state.audioModel);
	useEffect(() => {
		dispatch.audioModel.getSamples();
	}, []);
	return (
		<div className="max-w-7xl w-full mx-auto my-5 px-2 mb-20">
			<div className="xl:max-w-7xl flex lg:flex-row flex-col justify-end mx-auto items-center pb-5 lg:px-1 px-6 gap-y-4 mt-10 xl:mt-20">
				<div className="xl:mx-0 mx-2 xl:my-0 my-5 text-center lg:text-right">
					<h1 className="text-4xl tracking-wide font-extrabold text-neutral-900 dark:text-neutral-300">CURATORS</h1>
					<p className="mt-3 text-sm lg:text-base text-neutral-500 xl:whitespace-nowrap xl:max-w-full max-w-sm">
						The tapes are built from an artist sample. View the roster of talented artists and the samples provided.
					</p>
				</div>
			</div>
			<div className="col-span-12 items-center place-content-center rounded-md p-1">
				<ul role="list" className="flex justify-center items-center gap-x-1 gap-y-1 max-w-7xl mx-auto">
					{audioData?.samples &&
						audioData?.samples.map((sample, index: number) => (
							<li
								key={sample.wallet + sample.artist}
								className="w-full text-center rounded-lg bg-neutral-300 dark:bg-neutral-700 hover:bg-neutral-400 dark:hover:bg-neutral-800 transition-all">
								<Link to={`/listen/heds/hedstape/${index + 1}`}>
									<div className="flex-1 flex flex-col items-start p-2">
										<img className="lg:w-full lg:h-full flex-shrink-0 mx-auto rounded-lg" src={sample.image} alt="" />
										<div className="flex flex-col items-start justify-evenly px-2 pb-2">
											<h3 className="mt-4 dark:text-neutral-200 text-neutral-900 text-sm font-medium">{sample.artist}</h3>
											<dl className="mt-1 flex-grow flex flex-col justify-between">
												<dd className="dark:text-neutral-400 text-gray-500 text-sm">{sample.wallet.slice(0, 5) + "..."}</dd>
											</dl>
											<span className="dark:text-gray-400 text-gray-500 text-xs mt-1">{`hedsTAPE 0${index + 1}`}</span>
										</div>
									</div>
								</Link>
							</li>)
						)}
				</ul>
			</div>
		</div>
	);
};

export default Artists;
