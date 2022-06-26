import React from "react";
import { CheckIcon } from "@heroicons/react/solid";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useParams } from "react-router";
import { calculateTimelineStatus } from "../../../models/calculateTimelineStatus";
import { classNames } from "../../../models/classNames";

const TapeTimeline = () => {
	const { id } = useParams<{ space?: string; tape: string; id: string }>();
	const globaTapesData = useSelector((state: RootState) => state.globalTapesModel);
	return (
		<div className="lg:mt-36 mt-8 lg:my-2 my-10">
			{globaTapesData?.hedstapes?.[parseInt(id) - 1] && (
				<nav className="mx-auto max-w-7xl px-10" aria-label="Progress">
					<ol role="list" className="rounded-sm overflow-hidden lg:flex lg:rounded-none">
						{calculateTimelineStatus(globaTapesData?.hedstapes?.[parseInt(id) - 1]?.status).map((step, idx: number) => {
							if (step.status === "complete") {
								return <Completed step={step} idx={idx} />;
							} else if (step.status === "current") {
								return <Current step={step} idx={idx} />;
							} else return <Pending step={step} idx={idx} />;
						})}
					</ol>
				</nav>
			)}
		</div>
	);
};

export default TapeTimeline;

const Completed = ({ step, idx }: any) => {
	return (
		<li key={step.key} className="relative overflow-hidden lg:flex-1">
			<a href={step.href} className="group">
				<span
					className="absolute top-0 left-0 w-1 h-full bg-transparent lg:w-full lg:h-1 lg:bottom-0 lg:top-auto"
					aria-hidden="true"
				/>
				<span className={classNames(idx !== 0 ? "lg:pl-9" : "", "px-6 py-5 flex items-start text-sm font-medium")}>
					<span className="flex-shrink-0">
						<span className="w-10 h-10 flex items-center justify-center bg-opacity-60 bg-green-900 rounded-full">
							<CheckIcon className="w-6 h-6 text-neutral-300" aria-hidden="true" />
						</span>
					</span>
					<span className="mt-0.5 ml-4 min-w-0 flex flex-col">
						<span className="text-xs font-semibold tracking-wide uppercase text-neutral-500">{step.name}</span>
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
			<a href={step.href} aria-current="step">
				<span className={classNames(idx !== 0 ? "lg:pl-9" : "", "px-6 py-5 flex items-start text-sm font-medium")}>
					<span className="flex-shrink-0">
						<span className="w-10 h-10 flex items-center justify-center bg-neutral-400 rounded-full">
							<span className="text-neutral-950 uppercase tracking-wide">
								<i className={step.icon} />
							</span>
						</span>
					</span>
					<span className="mt-0.5 ml-4 min-w-0 flex flex-col">
						<span className="text-xs font-semibold text-neutral-400 tracking-wide uppercase">{step.name}</span>
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
					className="absolute top-0 left-0 w-1 h-full bg-transparent lg:w-full lg:h-1 lg:bottom-0 lg:top-auto"
					aria-hidden="true"
				/>
				<span className={classNames(idx !== 0 ? "lg:pl-9" : "", "px-6 py-5 flex items-start text-sm font-medium")}>
					<span className="flex-shrink-0">
						<span className="w-10 h-10 flex items-center justify-center bg-neutral-600 rounded-full">
							<span className="text-neutral-900 uppercase tracking-wide">
								<i className={step.icon} />
							</span>
						</span>
					</span>
					<span className="mt-0.5 ml-4 min-w-0 flex flex-col">
						<span className="text-xs font-semibold text-neutral-500 tracking-wide uppercase">{step.name}</span>
						<span className="text-xs font-thin lg:font-normal tracking-widest text-neutral-700">{step.description}</span>
					</span>
				</span>
			</a>
		</li>
	);
};
