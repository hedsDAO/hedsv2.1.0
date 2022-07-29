import React from "react";
import { Link } from "react-router-dom";

/**
 * @name LinkButton
 * @description basic dark, link button
 */

const LinkButton = ({ bg, link, children }: { bg: string; link: string; children: JSX.Element | string }) => {
	return (
		<button
			className={`flex items-center md:mx-0 mx-auto justify-between w-36 md:w-36 font-base py-2 px-5 text-neutral-975 dark:text-neutral-200 ${bg} bg-opacity-80 font-sans uppercase rounded-md text-sm group whitespace-nowrap`}>
			<Link to={link}>
				<p className="text-sm text-neutral-975 dark:text-neutral-200 md:tracking-widest uppercase font-semibold">{children}</p>
			</Link>
			<i className="fa-regular fa-angles-right ml-2 group-hover:ml-3 transition-all mt-0.25"></i>
		</button>
	);
};

export default LinkButton;
