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
		<div className="">
			{tapeData?.tape && (
				<nav className="xl:mx-auto mx-2 max-w-[100rem] p-2 bg-neutral-975 rounded-lg mt-1.5" aria-label="Progress">
					<ol role="list" className="rounded-sm overflow-hidden lg:flex lg:rounded-none gap-x-2">
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
		<li key={step.key} className="relative overflow-hidden lg:flex-1 bg-neutral-950 rounded-md lg:m-0 m-1 group">
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
					<span className="text-xs font-semibold tracking-wide uppercase text-neutral-500 mb-1">{step.name}</span>
					<span className="text-xs font-thin lg:font-normal tracking-widest text-neutral-600 text-left">{step.description}</span>
				</span>
			</span>
		</li>
	);
};

const Current = ({ modal, step, idx }: any) => {
	return (
		<li key={step.key} className="relative overflow-hidden lg:flex-1 hover:bg-neutral-950 bg-neutral-900 rounded-md transition-all">
			<button onClick={modal ? modal : () => {}} className="flex items-start justify-start">
				<span className={classNames(idx !== 0 ? "lg:pl-9" : "", "px-6 py-5 flex items-start text-sm font-medium")}>
					<span className="flex-shrink-0 pt-2">
						<span className="w-8 h-8 flex items-center justify-center bg-green-600 rounded-full mx-1.5">
							<span className="text-neutral-950 uppercase tracking-wide">
								<i className={step.icon} />
							</span>
						</span>
					</span>
					<span className="mt-0.5 ml-4 min-w-0 flex flex-col items-start justify-start">
						<span className="text-xs font-semibold text-neutral-400 tracking-wide uppercase mb-1">{step.name}</span>
						<span className="text-xs font-thin lg:font-normal tracking-widest text-neutral-400 text-left">
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
		<li key={step.key} className="relative overflow-hidden lg:flex-1 bg-neutral-950 rounded-md group">
			<span
				className="absolute top-0 left-0 w-[0.075rem] h-full bg-transparent lg:w-full lg:h-[0.075rem] lg:bottom-0 lg:top-auto"
				aria-hidden="true"
			/>
			<span className={classNames(idx !== 0 ? "lg:pl-9" : "", "px-6 py-5 flex items-start text-sm font-medium")}>
				<span className="flex-shrink-0 pt-2">
					<span className="w-8 h-8 flex items-center justify-center bg-amber-600 bg-opacity-75 rounded-full mx-1.5">
						<span className="text-neutral-900 uppercase tracking-wide ">
							<i className={step.icon} />
						</span>
					</span>
				</span>
				<span className="mt-0.5 ml-4 min-w-0 flex flex-col">
					<span className="text-xs font-semibold text-neutral-500 tracking-wide uppercase mb-1">{step.name}</span>
					<span className="text-xs font-thin lg:font-normal tracking-widest text-neutral-700 text-left">{step.description}</span>
				</span>
			</span>
		</li>
	);
};

export default TapeTimeline;
