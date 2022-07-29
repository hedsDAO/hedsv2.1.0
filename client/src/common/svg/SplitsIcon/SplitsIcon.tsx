import React from "react";

const SplitsIcon = ({ color }: { color?: string }) => {
	return (
		<svg width="10" height="10" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
			<circle cx="20" cy="60.0001" r="16" fill={color ? color : "#E5E7EB"} />
			<circle cx="60" cy="60.0001" r="12.8" fill={color ? color : "#E5E7EB"} />
			<circle cx="40" cy="19.9998" r="12.8" fill={color ? color : "#E5E7EB"} />
			<circle cx="40" cy="100" r="12.8" fill={color ? color : "#E5E7EB"} />
			<circle cx="100" cy="60.0002" r="9.6" fill={color ? color : "#E5E7EB"} />
			<circle cx="80" cy="19.9999" r="9.6" fill={color ? color : "#E5E7EB"} />
			<circle cx="80" cy="100" r="9.6" fill={color ? color : "#E5E7EB"} />
		</svg>
	);
};

export default SplitsIcon;
