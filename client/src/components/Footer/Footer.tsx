import React from "react";
import { useLocation } from "react-router";
// import hedDot from "/public/icons/heds_icon.png";
const navigation = {
	main: [
		{ name: "About", href: "#" },
		{ name: "Discord", href: "#" },
		{ name: "Twitter", href: "#" },
		{ name: "Github", href: "#" },
		{ name: "Contact", href: "#" },
		{ name: "Partners", href: "#" },
	],
};
export default function Footer() {
	const { pathname } = useLocation<{ pathname: string }>();

	return (
		<>
			{pathname !== "/" && (
				<footer className="mt-20">
					<div className="max-w-sm lg:max-w-7xl mx-auto pt-12 pb-6 px-4 overflow-hidden sm:px-6 lg:px-8">
						<nav className="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
							{navigation.main.map((item) => (
								<div key={item.name} className="px-5 py-1">
									<a href={item.href} className="text-sm text-neutral-600 hover:text-gray-900">
										{item.name}
									</a>
								</div>
							))}
						</nav>
						<p className="mt-8 text-center text-xs text-neutral-500">&copy; 2022 heds inc. All rights reserved.</p>
					</div>
				</footer>
			)}
			<div className="opacity-0 text-transparent text-sm absolute">hello there</div>
		</>
	);
}
