import React from "react";

/**
 * @name TextBlock
 * @description landing page text content container.
 */

interface TextBlockProps {
	tapeName: string;
	tapeTag: string;
	artistName: string;
	artistTag: string;
}

const TextBlock = ({ tapeName, tapeTag, artistName, artistTag }: TextBlockProps) => {
	return (
		<>
			<div className="flex flex-col items-end md:items-start font-serif uppercase mt-5">
				<h3 className="text-xl md:text-7xl text-neutral-200 font-extrabold bg-black border-[0.5px] border-neutral-800 px-2 py-0.5 md:py-1 rounded-t-sm">
					{tapeName}
				</h3>
				<span className="text-neutral-400 text-xs font-thin md:text-lg bg-black border-[0.5px] border-neutral-800 px-2 py-0.5 md:py-0.5 rounded-b-sm ">
					{tapeTag}
				</span>
			</div>
			<div className="flex flex-col items-end md:items-start font-serif uppercase mb-5">
				<h1 className="text-2xl md:text-7xl lg:text-8xl xl:text-9xl text-neutral-100 font-bold mt-5 md:mt-10 bg-black border-[0.5px] border-neutral-800 px-2 py-0.5 md:py-1 rounded-t-sm">
					{artistName}
				</h1>
				<span className="text-neutral-400 text-xs font-thin md:text-lg bg-black border-[0.5px] border-neutral-800 px-2 py-0.5 md:py-0.5 rounded-b-sm ">
					{artistTag}
				</span>
			</div>
		</>
	);
};

export default TextBlock;
