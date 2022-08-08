import React, { useState } from "react";
import { Switch } from "@headlessui/react";

const TapesToggle = () => {
	const [enabled, setEnabled] = useState(false);
	function classNames(...classes: any) {
		return classes.filter(Boolean).join(" ");
	}
	return (
		<div className="inline-flex flex-row items-center justify-center px-2 gap-y-5">
			<div className="px-2 mr-2">
				<span className={enabled ? "hidden" : "text-sm uppercase whitespace-nowrap text-neutral-400 mb-2"}>hedsTAPE</span>
				<span className={!enabled ? "hidden" : "text-sm uppercase whitespace-nowrap text-neutral-400"}>collabTAPE</span>
			</div>
			<div className="sm:max-w-7xl mx-auto flex justify-center">
				<Switch
					checked={enabled}
					onChange={setEnabled}
					className={classNames(
						enabled ? "bg-fuchsia-700" : "dark:bg-neutral-700 bg-neutral-300",
						"relative inline-flex flex-shrink-0 h-6 w-14 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none"
					)}>
					<span
						className={classNames(
							enabled ? "translate-x-8" : "translate-x-0",
							"pointer-events-none relative inline-block h-5 w-5 rounded-full bg-neutral-800 shadow transform ring-0 transition ease-in-out duration-200"
						)}>
						<span
							className={classNames(
								enabled ? "opacity-0 ease-out duration-100" : "opacity-100 ease-in duration-200",
								"absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
							)}
							aria-hidden="true">
						</span>
						<span
							className={classNames(
								enabled ? "opacity-100 ease-in duration-200" : "opacity-0 ease-out duration-100",
								"absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
							)}
							aria-hidden="true">
						</span>
					</span>
				</Switch>
			</div>
		</div>
	);
};

export default TapesToggle;
