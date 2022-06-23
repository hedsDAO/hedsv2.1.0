import React from "react";

const VoteHeader = ({ header, children }: { header: string; children: React.ReactNode }) => {
	return (
		<div className="bg-neutral-850 w-full py-3 px-3 mb-2 rounded-sm">
			<div className="flex font-serif items-center justify-between text-neutral-400 text-center sm:text-2xl text-xl py-2 px-4 bg-neutral-950 rounded-sm">
				{header}
				{children}
			</div>
		</div>
	);
};

export default VoteHeader;
