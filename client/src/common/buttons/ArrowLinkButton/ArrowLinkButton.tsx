import React from "react";
import { Link } from "react-router-dom";
import { DocumentData } from "firebase/firestore";

const ArrowLinkButton = ({ currentTape }: DocumentData) => {
	return (
		<Link to={currentTape?.links.heds || "/"}>
			<button className="my-auto text-amber-500 border border-neutral-700 mx-6 hover:text-neutral-100 hover:px-3 transition-all rounded-sm">
				<i className="fa-thin fa-arrow-right-long px-3 py-1" />
			</button>
		</Link>
	);
};

export default ArrowLinkButton;
