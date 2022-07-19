import React, { useState } from "react";
import { Switch } from "@headlessui/react";

const DarkModeToggle = () => {
	const [enabled, setEnabled] = useState<boolean>(false);
	function classNames(...classes: any) {
		return classes.filter(Boolean).join(" ");
	}
	const toggleTheme = () => {
		setEnabled(!enabled);

		if (localStorage.getItem("color-theme")) {
			if (localStorage.getItem("color-theme") === "light") {
				document.documentElement.classList.add("dark");
				localStorage.setItem("color-theme", "dark");
			} else {
				document.documentElement.classList.remove("dark");
				localStorage.setItem("color-theme", "light");
			}
		} else {
			if (document.documentElement.classList.contains("dark")) {
				document.documentElement.classList.remove("dark");
				localStorage.setItem("color-theme", "light");
			} else {
				document.documentElement.classList.add("dark");
				localStorage.setItem("color-theme", "dark");
			}
		}
	};

	return (
		<div className="inline-flex xl:flex-row flex-col items-center justify-center px-2 gap-y-5">
			<div className="sm:max-w-7xl mx-auto flex justify-center">
				<Switch
					checked={enabled}
					onChange={toggleTheme}
					className={classNames(
						enabled ? "bg-fuchsia-900" : "bg-amber-400",
						"relative inline-flex flex-shrink-0 h-7 w-20 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none"
					)}>
					<span
						className={classNames(
							enabled ? "translate-x-[3.25rem] bg-neutral-975" : "translate-x-0 bg-amber-200",
							"pointer-events-none relative inline-block h-6 w-6 rounded-full  shadow transform ring-0 transition ease-in-out duration-200"
						)}>
						<span
							className={classNames(
								enabled ? "opacity-0 ease-out duration-100" : "opacity-100 ease-in duration-200",
								"absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
							)}
							aria-hidden="true">
							<i className="fa-solid fa-brightness text-neutral-975 h-4 w-4 mx-auto -mb-0.5"></i>
						</span>
						<span
							className={classNames(
								enabled ? "opacity-100 ease-in duration-200" : "opacity-0 ease-out duration-100",
								"absolute inset-0 h-full w-full flex items-center justify-center transition-opacity"
							)}
							aria-hidden="true">
							<i className="fa-solid fa-moon-stars text-neutral-300 h-4 w-4 mx-auto -mb-0.25"></i>
						</span>
					</span>
				</Switch>
			</div>
		</div>
	);
};

export default DarkModeToggle;
