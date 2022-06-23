import React, { useState, useEffect } from "react";
import { doc, getDoc, DocumentData } from "firebase/firestore";
import { db } from "../..";

const About = () => {
	const [aboutData, setAboutData] = useState<DocumentData>();
	useEffect(() => {
		getAboutData();
	}, []);
	const getAboutData = async () => {
		const docRef = doc(db, "about", "2.0.1");
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			setAboutData(docSnap.data());
		}
	};
	function classNames(...classes: any[]) {
		return classes.filter(Boolean).join(" ");
	}
	return (
		<>
			{aboutData && (
				<>
					<div className="mx-auto text-center my-14">
						<span className="hidden md:inline tracking-widest text-3xl text-neutral-300 font-sans mr-2">heds</span>
						<span className="hidden md:inline font-extralight tracking-widest text-xl text-neutral-400 font-sans">
							the process
						</span>
					</div>
					<div className="bg-neutral-800 py-10 flex justify-center items-baseline">
						<nav aria-label="Progress">
							<ol role="list" className="overflow-hidden">
								{aboutData.steps.map((step: any, stepIdx: any) => (
									<li
										key={step.name}
										className={classNames(stepIdx !== aboutData.steps.length - 1 ? "pb-10" : "", "relative")}>
										{stepIdx !== aboutData.steps.length - 1 ? (
											<div
												className="-ml-px absolute mt-0.5 top-4 left-4 w-0.5 h-full bg-neutral-400"
												aria-hidden="true"
											/>
										) : null}
										<a className="relative flex items-start group">
											<span className="h-8 flex items-center">
												<span className="relative z-10 w-8 h-8 flex items-center justify-center bg-white rounded-full">
													{stepIdx + 1}
												</span>
											</span>
											<span className="ml-4 w-48 flex flex-col">
												<span className="text-xs font-semibold text-neutral-400 tracking-wide uppercase">
													{step.name}
												</span>
												<span className="text-sm text-gray-200">{step.description}</span>
											</span>
										</a>
									</li>
								))}
							</ol>
						</nav>
					</div>
					<div className="bg-neutral-900 px-10 pt-10 mx-7">
						<div className="max-w-7xl mx-auto py-10 sm:px-6 lg:py-20 lg:px-8">
							<div className="lg:grid lg:grid-cols-3 lg:gap-8 ">
								<div className="">
									<h2 className="text-3xl font-extrabold text-neutral-200">Frequently asked questions</h2>
								</div>
								<div className="mt-12 lg:mt-0 lg:col-span-2">
									<dl className="space-y-12">
										{aboutData.faqs.map((faq: any) => (
											<div key={faq.question}>
												<dt className="text-2xl leading-6 font-medium text-neutral-300">{faq.question}</dt>
												<dd className="mt-2 font-light text-base text-neutral-400">{faq.answer}</dd>
											</div>
										))}
									</dl>
								</div>
							</div>
						</div>
					</div>
				</>
			)}
		</>
	);
};
export default About;
