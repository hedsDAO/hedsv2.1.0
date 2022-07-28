import React, { useEffect, useState } from "react";
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

	useEffect(() => {
		if (localStorage.getItem("color-theme")) {
			if (localStorage.getItem("color-theme") === "dark") setEnabled(true);
		} else setEnabled(false);
	}, [])

	return (
		<div className="inline-flex xl:flex-row flex-col items-center justify-center gap-y-5">
			<div className="sm:max-w-7xl mx-auto flex justify-center">
				<Switch
					checked={enabled}
					onChange={() => toggleTheme()}
					className={classNames(
						enabled ? "bg-fuchsia-600" : "bg-yellow-300",
						"relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-sm cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none"
					)}>
					<span
						className={classNames(
							enabled ? "translate-x-5 bg-fuchsia-900" : "translate-x-0 bg-amber-200",
							"pointer-events-none relative inline-block h-5 w-5 rounded-sm shadow transform ring-0 transition ease-in-out duration-200"
						)}>
						<span
							className={classNames(
								enabled ? "opacity-0 ease-out duration-100" : "opacity-100 ease-in duration-200",
								"absolute inset-0 h-full w-full inline-flex items-center justify-center transition-opacity"
							)}
							aria-hidden="true">
							<i className="fa-solid fa-brightness text-amber-600 text-sm"></i>
						</span>
						<span
							className={classNames(
								enabled ? "opacity-100 ease-in duration-200" : "opacity-0 ease-out duration-100",
								"absolute inset-0 h-full w-full inline-flex items-center justify-center transition-opacity"
							)}
							aria-hidden="true">
							<i className="fa-solid fa-moon-stars text-fuchsia-200 text-sm"></i>
						</span>
					</span>
				</Switch>
			</div>
		</div>
	);
};

export default DarkModeToggle;
