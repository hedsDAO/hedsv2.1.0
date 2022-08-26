import React from "react";
import { useLocation } from "react-router";
// import hedDot from "/public/icons/heds_icon.png";
const navigation = {
	main: [
		{ name: "About", href: "https://heds.app/about" },
		{ name: "Discord", href: "https://discord.gg/YPuAbCcDtg" },
		{ name: "Twitter", href: "https://twitter.com/hedsDAO" },
		{ name: "Github", href: "https://github.com/hedsDAO" },
	],
};
export default function Footer() {
	const { pathname } = useLocation<{ pathname: string }>();

	return (
		<>
			{pathname !== "/" && (
				<footer className="pt-10 pb-4">
					<div className="max-w-sm lg:max-w-7xl mx-auto px-4 overflow-hidden sm:px-6 lg:px-8">
						<nav className="-mx-5 -my-2 flex flex-wrap justify-center" aria-label="Footer">
							{navigation.main.map((item) => (
								<div key={item.name} className="px-5 py-1">
									<a href={item.href} target={item.name === "About" ? "_self" : "_blank"} className="text-sm text-neutral-600 hover:text-neutral-400 transition-all">
										{item.name}
									</a>
								</div>
							))}
						</nav>
						<p className="mt-8 text-center text-xs text-neutral-500">heds - 2022</p>
						<p className="mt-2 text-center text-[0.6rem] text-neutral-500">v2.1.0</p>
					</div>
				</footer>
			)}
			<div className="opacity-0 text-transparent text-sm absolute">hello there</div>
		</>
	);
}
