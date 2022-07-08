import React, { useState, useEffect } from "react";

const GhostLoader = ({ children }: any) => {
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
		}, 1000);
		return () => {
			setLoading(false);
		};
	}, []);

	return (
		<div className="min-h-screen">
			{loading ? (
				<div className="w-screen h-[75vh] absolute z-50 bg-neutral-900 flex justify-center items-center  lg:mt-10">
					<i className="fas fa-circle-notch fa-spin text-white text-3xl"></i>
				</div>
			) : (
				<div className="animate__animated animate__fadeIn">{children}</div>
			)}
		</div>
	);
};

export default GhostLoader;
