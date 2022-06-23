import React from "react";

const VoteContentContainer = ({ className, children }: { className?: string; children: React.ReactNode }) => {
	return <div className={`bg-neutral-850 py-3 px-3 ${className}`}>{children}</div>;
};

export default VoteContentContainer;
