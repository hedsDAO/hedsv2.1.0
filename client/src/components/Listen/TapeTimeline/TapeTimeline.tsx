import React from "react";
import { CheckIcon } from "@heroicons/react/solid";
import { calculateTapeStatus } from "../../../utils/calculateTapeStatus";
import { classNames } from "../../../utils/classNames";
import { TapeData } from "../../../models/spaceModel";

const TapeTimeline = (tapeData: TapeData) => {
	return (
		<div className="my-12 pt-6">
			{tapeData?.tape && (
				<nav className="mx-auto max-w-7xl p-2 bg-neutral-950 border-[0.25px] border-neutral-800 rounded-lg px-5" aria-label="Progress">
					<ol role="list" className="rounded-sm overflow-hidden lg:flex lg:rounded-none">
						{calculateTapeStatus(+tapeData?.status?.status).map((step, idx: number) => {
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
			{/* <span
				className="absolute top-0 left-0 w-[0.075rem] h-[80%] bg-fuchsia-600 lg:w-full lg:h-[0.075rem] lg:bottom-0 lg:top-auto -mr-2 mt-2 lg:mt-0"
				aria-hidden="true"
			/> */}
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

export default TapeTimeline;
