import React, { useState } from "react";
import { Switch } from "@headlessui/react";
import hedsIcon from "/public/icons/heds_icon.png";
import goodSocietyIcon from "/public/icons/good_society_icon.png";

const TapesToggle = () => {
	const [enabled, setEnabled] = useState(false);
    function classNames(...classes: any) {
        return classes.filter(Boolean).join(" ");
    }
	return (
		<>
			<div className="w-20 flex justify-between max-w-7xl mx-auto">
				<span className={enabled ? "opacity-0" : "text-xs font-thin uppercase whitespace-nowrap text-neutral-400 mb-2"}>heds</span>
				<span className={!enabled ? "hidden" : "text-xs font-thin uppercase whitespace-nowrap text-neutral-400"}>good society</span>
			</div>
			<div className="sm:max-w-7xl mx-auto flex justify-center px-5 mb-5">
				<Switch
					checked={enabled}
					onChange={setEnabled}
					className={classNames(
						enabled ? "bg-fuchsia-700" : "bg-amber-700",
						"relative inline-flex flex-shrink-0 h-8 w-20 mb-4 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none"
					)}>
					<span
						className={classNames(
							enabled ? "translate-x-12" : "translate-x-0",
							"pointer-events-none relative inline-block h-7 w-7 rounded-full bg-neutral-800 shadow transform ring-0 transition ease-in-out duration-200"
						)}>
						<span
							className={classNames(
								enabled ? "opacity-0 ease-out duration-100" : "opacity-100 ease-in duration-200",
								"absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
							)}
							aria-hidden="true">
							<img src={hedsIcon} className="w-6 h-6" />
						</span>
						<span
							className={classNames(
								enabled ? "opacity-100 ease-in duration-200" : "opacity-0 ease-out duration-100",
								"absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
							)}
							aria-hidden="true">
							<img src={goodSocietyIcon} className="w-6 h-6" />
						</span>
					</span>
				</Switch>
			</div>
		</>
	);
};

export default TapesToggle;
