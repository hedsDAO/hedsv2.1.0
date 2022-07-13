import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "../../../store";

const Artists = () => {
	const dispatch = useDispatch<Dispatch>();
	const audioData = useSelector((state: RootState) => state.audioModel);
	useEffect(() => {
		dispatch.audioModel.getSamples();
	}, []);
	return (
		<div className="max-w-7xl w-full mx-auto mt-20">
			<ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 place-items-center">
				{audioData?.samples &&
					audioData?.samples.map((sample) => (
						<li className="col-span-1 flex flex-col text-center bg-neutral-950 rounded-lg shadow divide-y divide-neutral-700 border-[0.25px] border-neutral-700">
							<div className="flex-1 flex flex-col">
								<img className="w-32 h-32 flex-shrink-0 mx-auto rounded-lg" src={sample.image} alt="" />
								<h3 className="mt-6 text-neutral-500 text-sm font-medium">{sample.artist}</h3>
								<dl className="mt-1 flex-grow flex flex-col justify-between">
									<dt className="sr-only">wallet</dt>
									<dd className="text-gray-500 text-sm">{sample.wallet.slice(0, 5) + "..."}</dd>
								</dl>
							</div>
						</li>
					))}
			</ul>
		</div>
	);
};

export default Artists;
