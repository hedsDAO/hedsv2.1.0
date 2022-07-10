import React from "react";
import { useLocation } from "react-router";

export default function Footer() {
	const { pathname } = useLocation<{ pathname: string }>();

	return (
		<>
			{pathname !== "/" && (
				<footer className="p-8 rounded-lg md:flex md:items-center md:justify-between md:p-6 mx-10">
					<span className="text-xs text-gray-500 sm:text-center dark:text-gray-400 md:ml-2">
						© 2022{" "}
						<a href="https://heds.io/" className="hover:underline">
							heds inc
						</a>
						. All Rights Reserved.
					</span>
					<ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
						<li>
							<a href="#" className="mr-4 hover:underline md:mr-4 ">
								About
							</a>
						</li>
						<li>
							<a href="#" className="mr-4 hover:underline md:mr-4">
								Discord
							</a>
						</li>
						<li>
							<a href="#" className="mr-4 hover:underline md:mr-2">
								Twitter
							</a>
						</li>
					</ul>
				</footer>
			)}
		</>
	);
}
