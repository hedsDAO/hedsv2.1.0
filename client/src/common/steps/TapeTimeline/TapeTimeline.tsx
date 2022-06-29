import React from "react";
import { CheckIcon } from "@heroicons/react/solid";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useParams } from "react-router";
import { calculateTimelineStatus } from "../../../utils/calculateTimelineStatus";
import { classNames } from "../../../utils/classNames";

const TapeTimeline = () => {
	const { id } = useParams<{ space?: string; tape: string; id: string }>();
	const globaTapesData = useSelector((state: RootState) => state.globalTapesModel);
	return (
		<div className="my-4">
			{globaTapesData?.hedstapes?.[parseInt(id) - 1] && (
				<nav className="mx-auto max-w-7xl p-2 bg-neutral-950 rounded-lg" aria-label="Progress">
					<ol role="list" className="rounded-sm overflow-hidden lg:flex lg:rounded-none">
						{calculateTimelineStatus(globaTapesData?.hedstapes?.[parseInt(id) - 1]?.status).map((step, idx: number) => {
							if (step.status === "complete") {
								return <Completed key={step.key} step={step} idx={idx} />;
							} else if (step.status === "current") {
								return <Current key={step.key} step={step} idx={idx} />;
							} else return <Pending key={step.key} step={step} idx={idx} />;
						})}
					</ol>
				</nav>
			)}
		</div>
	);
};

const Completed = ({ step, idx }: any) => {
	return (
		<li key={step.key} className="relative overflow-hidden lg:flex-1">
			<a href={step.href} className="group">
				<span
					className="absolute top-0 left-0 w-0.5 h-full bg-transparent lg:w-full lg:h-[0.075rem] lg:bottom-0 lg:top-auto"
					aria-hidden="true"
				/>
				<span className={classNames(idx !== 0 ? "lg:pl-9" : "", "px-6 py-5 flex items-start text-sm font-medium")}>
					<span className="flex-shrink-0">
						<span className="w-10 h-10 flex items-center justify-center bg-opacity-60 bg-green-900 rounded-full mx-1.5">
							<CheckIcon className="w-6 h-6 text-neutral-300" aria-hidden="true" />
						</span>
					</span>
					<span className="mt-0.5 ml-4 min-w-0 flex flex-col">
						<span className="text-xs font-semibold tracking-wide uppercase text-neutral-500 mb-1">{step.name}</span>
						<span className="text-xs font-thin lg:font-normal tracking-widest text-neutral-700">{step.description}</span>
					</span>
				</span>
			</a>
		</li>
	);
};

const Current = ({ step, idx }: any) => {
	return (
		<li key={step.key} className="relative overflow-hidden lg:flex-1">
			<span
				className="absolute top-0 left-0 w-[0.075rem] h-[80%] bg-fuchsia-600 lg:w-full lg:h-[0.075rem] lg:bottom-0 lg:top-auto -mr-2 mt-2 lg:mt-0"
				aria-hidden="true"
			/>
			<a href={step.href} aria-current="step">
				<span className={classNames(idx !== 0 ? "lg:pl-9" : "", "px-6 py-5 flex items-start text-sm font-medium")}>
					<span className="flex-shrink-0">
						<span className="w-10 h-10 flex items-center justify-center bg-fuchsia-600 rounded-full mx-1.5">
							<span className="text-neutral-950 uppercase tracking-wide">
								<i className={step.icon} />
							</span>
						</span>
					</span>
					<span className="mt-0.5 ml-4 min-w-0 flex flex-col">
						<span className="text-xs font-semibold text-neutral-400 tracking-wide uppercase mb-1">{step.name}</span>
						<span className="text-xs font-thin lg:font-normal tracking-widest text-neutral-400">{step.description}</span>
					</span>
				</span>
			</a>
		</li>
	);
};

const Pending = ({ step, idx }: any) => {
	return (
		<li key={step.key} className="relative overflow-hidden lg:flex-1">
			<a href={step.href} className="group">
				<span
					className="absolute top-0 left-0 w-[0.075rem] h-full bg-transparent lg:w-full lg:h-[0.075rem] lg:bottom-0 lg:top-auto"
					aria-hidden="true"
				/>
				<span className={classNames(idx !== 0 ? "lg:pl-9" : "", "px-6 py-5 flex items-start text-sm font-medium")}>
					<span className="flex-shrink-0">
						<span className="w-10 h-10 flex items-center justify-center bg-neutral-600 rounded-full mx-1.5">
							<span className="text-neutral-900 uppercase tracking-wide">
								<i className={step.icon} />
							</span>
						</span>
					</span>
					<span className="mt-0.5 ml-4 min-w-0 flex flex-col">
						<span className="text-xs font-semibold text-neutral-500 tracking-wide uppercase mb-1">{step.name}</span>
						<span className="text-xs font-thin lg:font-normal tracking-widest text-neutral-700">{step.description}</span>
					</span>
				</span>
			</a>
		</li>
	);
};

const Sample = ({ step, idx }: any) => {
	return (
		<li key={step.key} className="relative overflow-hidden lg:flex-1">
			<a href={step.href} className="group">
				<span
					className="absolute top-0 left-0 w-[0.075rem] h-full bg-transparent lg:w-full lg:h-[0.075rem] lg:bottom-0 lg:top-auto"
					aria-hidden="true"
				/>
				<span className={classNames(idx !== 0 ? "lg:pl-9" : "", "px-6 py-5 flex items-start text-sm font-medium")}>
					<span className="flex-shrink-0">
						<span className="w-10 h-10 flex items-center justify-center bg-neutral-600 rounded-full mx-1.5">
							<span className="text-neutral-900 uppercase tracking-wide">
								<i className={step.icon} />
							</span>
						</span>
					</span>
					<span className="mt-0.5 ml-4 min-w-0 flex flex-col">
						<span className="text-xs font-semibold text-neutral-500 tracking-wide uppercase mb-1">{step.name}</span>
						<span className="text-xs font-thin lg:font-normal tracking-widest text-neutral-700">{step.description}</span>
					</span>
				</span>
			</a>
		</li>
	);
};
export default TapeTimeline;


// <div className="flex justify-center items-center mt-10">
// <h3 className="text-lg leading-6 tracking-widest font-medium text-neutral-300 mb-3">THE SAMPLE</h3>
// </div>
// <div className="grid grid-cols-12 gap-x-2 max-w-lg mx-auto mt-2 px-4 py-3 sm:p-6 bg-neutral-950 sm:rounded-lg mb-10">
// <div className="col-span-5 flex flex-col items-center justify-center">
// 	<div className="my-2">
// 		<img
// 			src={globalTapeData?.sample?.image}
// 			className="w-32 h-32 mx-auto p-0.5 transition-all ease-in-out rounded-full"
// 		/>
// 	</div>
// </div>
// <div className="col-span-7 flex flex-col items-center justify-center">
// 	<div className="flex items-center justify-between w-full bg-neutral-850 text-neutral-400 uppercase px-2 py-1.5 rounded-lg">
// 		<span className="ml-1">artist</span>
// 		<span className="bg-neutral-900 text-sm text-neutral-300 px-2.5 py-0.5 rounded-md">
// 			{globalTapeData?.sample?.artist}
// 		</span>
// 	</div>
// 	<div className="flex items-center justify-between w-full bg-neutral-850 text-neutral-400 uppercase px-2 py-1.5 rounded-lg mt-2">
// 		<span className="ml-1">bpm</span>
// 		<span className="bg-neutral-900 text-sm text-neutral-300 px-2.5 py-0.5 rounded-md">
// 			{globalTapeData?.sample?.bpm}
// 		</span>
// 	</div>
// 	<div className="flex items-center justify-between w-full bg-neutral-850 text-neutral-400 uppercase px-2 py-1.5 rounded-lg mt-2">
// 		<span className="ml-1">download</span>
// 		<button className="bg-neutral-900 text-sm text-neutral-300 px-2.5 py-0.5 rounded-md">
// 			<DownloadIcon className="h-4 w-4 text-center text-neutral-300 z-40 transition-all" aria-hidden="true" />
// 		</button>
// 	</div>
// </div>
// </div>