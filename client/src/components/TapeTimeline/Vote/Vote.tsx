import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

const Vote = ({ active, completed }: any) => {
	const { tape, id } = useParams<{ space: string; tape: string; id: string }>();
	const { hedstapes } = useSelector((state: RootState) => state.globalTapesModel);
	return (
		<>
			{completed && <i className={"fa-light fa-check text-sm text-green-500 mb-1"}></i>}
			{hedstapes?.length && completed ? (
				<button disabled={!active || !completed} className="group text-left my-2">
					<span className={"flex items-start text-sm font-medium"}>
						<span className="flex-shrink-0">
							<span
								className="md:w-12 md:h-12 w-10 h-10 border flex items-center justify-center rounded-full"
								style={{ borderColor: completed ? "green" : active ? "#f59e0b" : "gray" }}>
								<i className="fa-thin fa-landmark text-neutral-200 my-auto md:text-base text-xs"></i>
							</span>
						</span>
					</span>
				</button>
			) : active ? (
				<button disabled={!active} className="group text-left my-2">
					<Link to={`/vote/${tape}/${id}`}>
						<span className={"flex items-start text-sm font-medium"}>
							<span className="flex-shrink-0">
								<span
									className="md:w-12 md:h-12 w-10 h-10 border flex items-center justify-center rounded-full"
									style={{ borderColor: completed ? "green" : active ? "#f59e0b" : "gray" }}>
									<i className="fa-thin fa-landmark text-neutral-200 my-auto md:text-base text-xs"></i>
								</span>
							</span>
						</span>
					</Link>
				</button>
			) : (
				<button disabled={!active || !completed} className="group text-left my-2">
					<span className={"flex items-start text-sm font-medium"}>
						<span className="flex-shrink-0">
							<span
								className="md:w-12 md:h-12 w-10 h-10 border flex items-center justify-center rounded-full"
								style={{ borderColor: completed ? "green" : active ? "#f59e0b" : "gray" }}>
								<i className="fa-thin fa-landmark text-neutral-200 my-auto md:text-base text-xs"></i>
							</span>
						</span>
					</span>
				</button>
			)}
			<div className="text-neutral-400 font-thin text-xs mb-1 uppercase text-center whitespace-nowrap">VOTE</div>
			{active && <div className="relative bg-neutral-600 h-0.25 w-8 "></div>}
		</>
	);
};

export default Vote;
