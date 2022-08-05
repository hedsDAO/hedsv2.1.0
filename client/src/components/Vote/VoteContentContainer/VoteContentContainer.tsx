import React from "react";

const VoteContentContainer = ({ className, children }: { className?: string; children: React.ReactNode }) => {
	return <div className={`bg-gray-300 dark:bg-neutral-975 py-2 px-2 rounded-lg ${className}`}>{children}</div>;
};

export default VoteContentContainer;
