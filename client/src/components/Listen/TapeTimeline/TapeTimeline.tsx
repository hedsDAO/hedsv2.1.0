import React from "react";
import { CheckIcon } from "@heroicons/react/solid";
import { calculateTapeStatus } from "../../../utils/calculateTapeStatus";
import { classNames } from "../../../utils/classNames";
import { TapeData } from "../../../models/spaceModel";
import { useDispatch } from "react-redux";
import { Dispatch } from "../../../store";
import { TapeStatus } from "../../../models/common";
import { Modals } from "../../../models/globalModel";

const TapeTimeline = (tapeData: TapeData) => {
	const dispatch = useDispatch<Dispatch>();
	const status = +tapeData?.status?.status;
	const handleTapeAction = () => {
		if (status === TapeStatus.SUBMIT_OPEN)
			return () => dispatch.globalModel.setModal({ open: true, modal: Modals.SUBMIT, locked: true });
		if (status === TapeStatus.VOTE_OPEN) return () => dispatch.globalModel.setModal({ open: true, modal: Modals.VOTE, locked: true });
		if (status === TapeStatus.MINT_OPEN) return () => dispatch.globalModel.setModal({ open: true, modal: Modals.MINT, locked: true });
	};
	return (
		<div className="max-w-[80rem] mx-auto lg:mt-10 mt-4">
			{/* <div className="inline-flex justify-start items-baseline rounded-md px-1.5 w-full xl:mt-4 mb-1.5">
				<i className="fa-regular fa-clock text-neutral-700 dark:text-neutral-400 text-xs place-self-center self-center -mb-0.25" />
				<span className="text-neutral-700 dark:text-neutral-400 tracking-widest px-3 font-semibold text-lg">TAPE TIMELINE</span> */}
				{/* <span className="font-light text-sm dark:text-neutral-500 text-neutral-600 tracking-widest">{tapeData?.sample?.artist}</span> */}
			{/* </div> */}
			{tapeData?.tape && (
				<nav className="mx-auto p-1 max-w-[80rem] bg-gray-300 dark:bg-neutral-975 rounded-lg" aria-label="Progress">
					<ol role="list" className="rounded-sm overflow-hidden flex lg:flex-row flex-col lg:rounded-none gap-x-1 gap-y-1">
						{calculateTapeStatus(+tapeData?.status?.status).map((step, idx: number) => {
							if (step.status === "complete") {
								return <Completed key={step.key} step={step} idx={idx} />;
							} else if (step.status === "current") {
								return <Current modal={handleTapeAction()} key={step.key} step={step} idx={idx} />;
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
		<li key={step.key} className="relative overflow-hidden lg:flex-1 bg-neutral-300 dark:bg-neutral-950 rounded-md lg:m-0 m-1 group">
			<span
				className="absolute top-0 left-0 w-0.5 h-full bg-transparent lg:w-full lg:h-[0.075rem] lg:bottom-0 lg:top-auto"
				aria-hidden="true"
			/>
			<span className={classNames(idx !== 0 ? "lg:pl-9" : "", "px-6 py-5 flex items-start text-sm font-medium")}>
				<span className="flex-shrink-0 pt-2">
					<span className="w-8 h-8 flex items-center justify-center bg-opacity-60 bg-green-900 rounded-full mx-1.5">
						<CheckIcon className="w-4 h-4 text-neutral-300" aria-hidden="true" />
					</span>
				</span>
				<span className="mt-0.5 ml-4 min-w-0 flex flex-col">
					<span className="text-xs font-semibold tracking-wide uppercase text-neutral-700 dark:text-neutral-500 mb-1">{step.name}</span>
					<span className="text-xs font-thin lg:font-normal tracking-widest text-neutral-600 text-left">{step.description}</span>
				</span>
			</span>
		</li>
	);
};

const Current = ({ modal, step, idx }: any) => {
	return (
		<li key={step.key} className="relative overflow-hidden lg:flex-1 bg-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-700 dark:bg-neutral-900 rounded-md transition-all">
			<button onClick={modal ? modal : () => { }} className="flex items-start justify-start">
				<span className={classNames(idx !== 0 ? "lg:pl-9" : "", "px-6 py-5 flex items-start text-sm font-medium")}>
					<span className="flex-shrink-0 pt-2">
						<span className="w-8 h-8 flex items-center justify-center bg-green-600 rounded-full mx-1.5">
							<span className="text-neutral-950 uppercase tracking-wide">
								<i className={step.icon} />
							</span>
						</span>
					</span>
					<span className="mt-0.5 ml-4 min-w-0 flex flex-col items-start justify-start">
						<span className="text-xs font-semibold dark:text-neutral-200 text-neutral-800 tracking-wide uppercase mb-1">{step.name}</span>
						<span className="text-xs font-thin lg:font-normal tracking-widest dark:text-neutral-300 text-neutral-600 text-left">
							{step.description}
						</span>
					</span>
				</span>
			</button>
		</li>
	);
};

const Pending = ({ step, idx }: any) => {
	return (
		<li key={step.key} className="relative overflow-hidden lg:flex-1 bg-neutral-200 dark:bg-neutral-850 rounded-md group">
			<span
				className="absolute top-0 left-0 w-[0.075rem] h-full bg-transparent lg:w-full lg:h-[0.075rem] lg:bottom-0 lg:top-auto"
				aria-hidden="true"
			/>
			<span className={classNames(idx !== 0 ? "lg:pl-9" : "", "px-6 py-5 flex items-start text-sm font-medium")}>
				<span className="flex-shrink-0 pt-2">
					<span className="w-8 h-8 flex items-center justify-center bg-neutral-600 bg-opacity-75 rounded-full mx-1.5">
						<span className="text-neutral-900 uppercase tracking-wide ">
							<i className={step.icon} />
						</span>
					</span>
				</span>
				<span className="mt-0.5 ml-4 min-w-0 flex flex-col">
					<span className="text-xs font-semibold text-neutral-700 dark:text-neutral-500 tracking-wide uppercase mb-1">{step.name}</span>
					<span className="text-xs font-thin lg:font-normal tracking-widest text-neutral-700 text-left">{step.description}</span>
				</span>
			</span>
		</li>
	);
};

export default TapeTimeline;
