import React from "react";
import { CheckIcon } from "@heroicons/react/solid";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useParams } from "react-router";
import { TapeStatus } from "../../../models/common";

function classNames(...classes: any) {
	return classes.filter(Boolean).join(" ");
}

const TapeTimeline = () => {
	const { space, tape, id } = useParams<{ space?: string; tape: string; id: string }>();
	const globaTapesData = useSelector((state: RootState) => state.globalTapesModel);
	const globalTapeData = globaTapesData?.hedstapes?.[parseInt(id) - 1];
	const steps = [
		{
			id: <i className="fa-regular fa-waveform"></i>,
			name: "SUBMIT",
			key: "1",
			description: "Download the sample and submit your flip for a chance to be on the tape.",
			href: "#",
			status: "complete",
		},
		{
			id: <i className="fa-solid fa-box-ballot"></i>,
			name: "VOTE",
			key: "2",
			description: "Public submissions are posted anonymously and voted on by tape owners.",
			href: "#",
			status: "current",
		},
		{
			id: <i className="fa-solid fa-cassette-tape"></i>,
			name: "MINT",
			key: "3",
			description: "The collection has been released. Minting will be open for 24 hours.",
			href: "#",
			status: "upcoming",
		},
	];
	return (
		<div className="lg:mt-36 mt-8 lg:my-2 my-10">
			{globaTapesData?.hedstapes?.[parseInt(id) - 1] && (
				<nav className="mx-auto max-w-7xl px-10" aria-label="Progress">
					<ol role="list" className="rounded-sm overflow-hidden lg:flex lg:rounded-none">
						{steps.map((step, stepIdx) => (
							<li key={step.key} className="relative overflow-hidden lg:flex-1">
								<div>
									{step.status === "complete" ? (
										<a href={step.href} className="group">
											<span
												className="absolute top-0 left-0 w-1 h-full bg-transparent lg:w-full lg:h-1 lg:bottom-0 lg:top-auto"
												aria-hidden="true"
											/>
											<span
												className={classNames(
													stepIdx !== 0 ? "lg:pl-9" : "",
													"px-6 py-5 flex items-start text-sm font-medium"
												)}>
												<span className="flex-shrink-0">
													<span className="w-10 h-10 flex items-center justify-center bg-green-900 rounded-full">
														<CheckIcon className="w-6 h-6 text-neutral-300" aria-hidden="true" />
													</span>
												</span>
												<span className="mt-0.5 ml-4 min-w-0 flex flex-col">
													<span className="text-xs font-semibold tracking-wide uppercase text-neutral-300">
														{step.name}
													</span>
													<span className="text-xs font-thin lg:font-normal tracking-widest text-neutral-500">
														{step.description}
													</span>
												</span>
											</span>
										</a>
									) : step.status === "current" ? (
										<a href={step.href} aria-current="step">
											{/* <span
												className="absolute top-0 left-0 w-1 h-full bg-neutral-500 lg:w-full lg:h-[0.1px] lg:bottom-0 lg:top-auto"
												aria-hidden="true"
											/> */}
											<span
												className={classNames(
													stepIdx !== 0 ? "lg:pl-9" : "",
													"px-6 py-5 flex items-start text-sm font-medium"
												)}>
												<span className="flex-shrink-0">
													<span className="w-10 h-10 flex items-center justify-center border-[0.5px] border-amber-500 rounded-full">
														<span className="text-amber-500 uppercase tracking-wide">{step.id}</span>
													</span>
												</span>
												<span className="mt-0.5 ml-4 min-w-0 flex flex-col">
													<span className="text-xs font-semibold text-amber-500 tracking-wide uppercase">
														{step.name}
													</span>
													<span className="text-xs font-thin lg:font-normal tracking-widest text-neutral-400">
														{step.description}
													</span>
												</span>
											</span>
										</a>
									) : (
										<a href={step.href} className="group">
											<span
												className="absolute top-0 left-0 w-1 h-full bg-transparent lg:w-full lg:h-1 lg:bottom-0 lg:top-auto"
												aria-hidden="true"
											/>
											<span
												className={classNames(
													stepIdx !== 0 ? "lg:pl-9" : "",
													"px-6 py-5 flex items-start text-sm font-medium"
												)}>
												<span className="flex-shrink-0">
													<span className="w-10 h-10 flex items-center justify-center border border-neutral-600 rounded-full">
														<span className="text-gray-500 uppercase tracking-wide">{step.id}</span>
													</span>
												</span>
												<span className="mt-0.5 ml-4 min-w-0 flex flex-col">
													<span className="text-xs font-semibold text-gray-500 tracking-wide uppercase">
														{step.name}
													</span>
													<span className="text-xs font-thin lg:font-normal tracking-widest text-neutral-500">
														{step.description}
													</span>
												</span>
											</span>
										</a>
									)}
								</div>
							</li>
						))}
					</ol>
				</nav>
			)}
		</div>
	);
};

export default TapeTimeline;
