import React, { useState, useEffect, Fragment } from "react";
import useMoralisHooks from "../../../hooks/useMoralis";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import ReactLoading from "react-loading";

export function percentageOfTotal(i: any, values: any, total: any) {
	const reducedTotal: any = total.reduce((a: any, b: any) => a + b, 0);
	const percent = (values[i] / reducedTotal) * 100;
	return isNaN(percent) ? 0 : percent;
}

export function quadraticMath(i: any, choice: any, vp: any) {
	return Math.sqrt((percentageOfTotal(i + 1, choice, Object.values(choice)) / 100) * vp);
}

const VotingResults = ({ voteData, proposalData }: any) => {
	const [viewAll, setViewAll] = useState<boolean>(false);
	const [voteResults, setVoteResults] = useState<Array<number>>([0]);
	const [sortedVoteResults, setSortedVoteResults] = useState<Array<number>>([0]);
	const { user } = useMoralisHooks();
	const walletId = user?.attributes?.ethAddress;
	const voteState = useSelector((state: RootState) => state?.voteModel);

	useEffect(() => {
		if (proposalData) resultsByVoteBalance();
	}, []);

	useEffect(() => {
		if (proposalData) resultsByVoteBalance();
	}, [voteData]);

	function round(num: number, decimalPlaces = 0): number {
		if (num < 0) return -round(-num, decimalPlaces);
		var p = Math.pow(10, decimalPlaces);
		var n = (num * p).toPrecision(15);
		return Math.round(+n) / p;
	}

	const sumOfResultsBalance = () => {
		return voteData.reduce((a: number, b: any) => a + b.vp, 0);
	};

	const resultsByPercentage = (results: Array<number>) => {
		const totalVoteBalance = results.reduce((a: number, b: number) => a + b);
		return results.map((votes: number) => {
			return (votes / totalVoteBalance) * 100;
		});
	};

	const resultsByUserBalance = () => {
		const results = proposalData.choices
			// @ts-ignore
			.map((choice: any, i: number) =>
				voteData
					.map((vote: any) => vote.voter.toLowerCase() === walletId && quadraticMath(i, vote.choice, vote.vp))
					.reduce((a: any, b: any) => a + b, 0)
			)
			.map((sqrt: number) => sqrt * sqrt);
		return results;
	};

	const sortAllVotes = (allVotes: [number]) => {
		return proposalData.choices
			.map((choice: any, i: number) => ({ i, choice }))
			.sort((a: any, b: any) => allVotes[b.i] - allVotes[a.i]);
	};

	const resultsByVoteBalance = () => {
		const results = proposalData.choices
			// @ts-ignore
			.map((choice: any, i: number) =>
				voteData.map((vote: any) => quadraticMath(i, vote.choice, vote.vp)).reduce((a: any, b: any) => a + b, 0)
			)
			.map((sqrt: number) => sqrt * sqrt);
		const unsortedResults = results
			// @ts-ignore
			.map((res: any, i: number) => percentageOfTotal(i, results, results))
			.map((p: number) => (sumOfResultsBalance() / 100) * p);
		setVoteResults(unsortedResults);
		setSortedVoteResults(sortAllVotes(unsortedResults));
	};

	return (
		<div className="-my-2">
			{!voteState?.isLoading && voteResults?.length && voteData && proposalData?.id ? (
				<Fragment>
					{(viewAll ? sortedVoteResults : sortedVoteResults.slice(0, 5))?.map((vote: any) => {
						if (round(resultsByPercentage(voteResults)[vote.i]))
							return (
								<div key={vote.i} className="bg-gray-200 dark:bg-neutral-950 my-2 rounded-sm border dark:border-neutral-900">
									<div className="flex justify-between text-neutral-600 dark:text-neutral-400 py-1">
										<div
											style={{ minWidth: "150px" }}
											className={`text-left px-3 text-sm font-medium sm:w-6/12 md:w-8/12 py-1`}>
											{vote.choice}
										</div>
										<div className="flex justify-around items-end sm:6/12 md:w-4/12 my-1 md:px-0 px-4">
											<div className="text-green-500 text-sm sm:mr-2 mr-4 max-w-[3ch] min-w-[3ch]">
												{round(voteResults[vote.i], 1)}
											</div>
											<div className="text-neutral-500 text-sm ml-2 max-w-[6ch] min-w-[6ch]">
												{round(resultsByPercentage(voteResults)[vote.i], 2)}%{" "}
											</div>
										</div>
									</div>
									<div className="mx-3 pb-3">
										<div className="bg-neutral-400 rounded-full h-2 dark:bg-gray-700">
											<div
												className={
													round(resultsByPercentage(resultsByUserBalance())[vote.i]) >=
														round(resultsByPercentage(voteResults)[vote.i])
														? "bg-blue-800 h-2 rounded-full relative z-30"
														: "bg-blue-800 h-2 rounded-full relative z-10"
												}
												style={{
													width: `${round(resultsByPercentage(voteResults)[vote.i])}%`,
												}}
											/>
											{resultsByUserBalance()[vote.i] ? (
												<div
													className="bg-teal-600 h-2 rounded-full relative -mt-2 z-20"
													style={{
														width: `${round(resultsByPercentage(resultsByUserBalance())[vote.i])}%`,
													}}
												/>
											) : null}
										</div>
									</div>
								</div>
							);
					})}
					{voteData && <button
						className="w-full mx-auto py-1 bg-gray-200 dark:bg-neutral-850 text-neutral-700 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-300 inline-flex text-center justify-center items-center text-sm px-2 gap-x-2 transition-all mb-2 rounded-md"
						onClick={() => setViewAll(!viewAll)}>
						{viewAll ? "less" : "more"}
					</button>}
				</Fragment>
			) : voteState?.isLoading ? (
				<div className="bg-neutral-950 mx-auto my-3 py-32 flex justify-center items-center flex-col">
					<ReactLoading className="w-10 h-10 mx-7" type={"bars"} color={"#089F6E"} height={"16"} width={"16"} />
					<div className="text-neutral-400 font-thin text-sm animate__animated animate__fadeInUp mt-2.5">updating votes</div>
				</div>
			) : (
				<div className="bg-neutral-950 my-2 rounded-sm border border-neutral-900 text-center">
					<div className={`inline-flex justify-center items-baseline px-3  font-thin text-neutral-300 py-5`}>
						<i className="fa-solid fa-empty-set font-thin text-red-500 mr-2 text-xs" />
						<div className="text-sm -mt-0.5">no votes found</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default VotingResults;
