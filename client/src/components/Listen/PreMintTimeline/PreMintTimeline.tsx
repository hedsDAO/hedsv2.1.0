import React, { useEffect, useState } from "react";
import { CheckIcon } from "@heroicons/react/solid";
import { calculatePreMintStatus } from "../../../utils/calculatePreMintStatus";
import { classNames } from "../../../utils/classNames";
import { TapeData } from "../../../models/spaceModel";
import { useDispatch } from "react-redux";
import { Dispatch } from "../../../store";
import { PreMintStatus } from "../../../models/common";
import { Modals } from "../../../models/globalModel";
import axios from "axios";
import { useParams } from "react-router";

const PreMintTimeline = (tapeData: TapeData) => {
    const { id } = useParams<{ id: string }>();
    const [totalMinted, setTotalMinted] = useState<number | null>(null);
    const dispatch = useDispatch<Dispatch>();
    const status = +tapeData?.status?.status;
    const handleTapeAction = () => {
        if (status === PreMintStatus.PRE_MINT_OPEN)
            return () =>
                dispatch.globalModel.setModal({ open: true, modal: Modals.PRE_MINT, locked: true });
        if (status === PreMintStatus.PUBLIC_MINT_OPEN)
            return () =>
                dispatch.globalModel.setModal({
                    open: true,
                    modal: Modals.PUBLIC_MINT,
                    locked: true,
                });
    };

    useEffect(() => {
        if (id === "goodsociety") {
            const options = {
                method: "GET",
                url: `https://deep-index.moralis.io/api/v2/nft/0xEeB431Caa15B526f48Ee4DB3697FE57EC8223A8e`,
                params: { chain: "eth", format: "decimal" },
                headers: {
                    Accept: "application/json",
                    "X-API-Key": "xZqpyPL3oIBNmjtTNj90SsEZpCorYVqDFjya9aJE3dkClvWfyx4EHFnuNz7RAUpN",
                },
            };
            axios
                // @ts-ignore
                .request(options)
                .then(function (response) {
                    console.log(response, 'res')
                    setTotalMinted(response.data.total);
                })
                .catch(function (error) {
                    console.error(error);
                    return 0;
                });
        }
    }, []);
    return (
        <div className="mx-auto p-1 rounded-lg">
            {tapeData?.tape && (
                <nav className="mx-auto" aria-label="Progress">
                    <ol
                        role="list"
                        className="rounded-sm overflow-hidden flex xl:flex-row flex-col gap-x-1 gap-y-1">
                        {calculatePreMintStatus(+tapeData?.status?.status).map(
                            (step, idx: number) => {
                                if (step.name === "minted") {
                                    return (
                                        <div key={step.key} className="rounded-xl">
                                            <TotalMinted step={step} totalMinted={totalMinted} />
                                        </div>
                                    );
                                } else
                                    return (
                                        <div key={step.key} className="rounded-xl w-full">
                                            {step.status === "complete" ? (
                                                <Completed key={step.key} step={step} idx={idx} />
                                            ) : step.status === "current" ? (
                                                <Current
                                                    modal={handleTapeAction()}
                                                    key={step.key}
                                                    step={step}
                                                    totalMinted={totalMinted}
                                                    idx={idx}
                                                />
                                            ) : (
                                                <Pending
                                                    key={step.key}
                                                    step={step}
                                                    idx={idx}
                                                    tapeData={tapeData}
                                                />
                                            )}
                                        </div>
                                    );
                            }
                        )}
                    </ol>
                </nav>
            )}
        </div>
    );
};

const TotalMinted = ({ step, totalMinted }: any) => {
    return (
        <li
            key={step.key + step.name}
            className="relative overflow-hidden lg:flex-1 bg-green-500/50 dark:bg-green-400/50 lg:m-0 group rounded-lg h-full shadow-sm">
            <span className="px-10 py-4 flex-col items-center justify-center text-sm font-medium lg:flex hidden gap-y-1.5">
                <span className="text-sm font-semibold tracking-wide uppercase">MINTED</span>
                <span className="text-sm font-semibold tracking-widest uppercase text-neutral-700 dark:text-gray-400 dark:bg-neutral-900 bg-gray-100 px-2 rounded-md shadow-sm">
                    {totalMinted}/100
                </span>
            </span>
            <span className="px-6 py-4 justify-center gap-x-2 items-center text-sm font-medium lg:hidden flex">
                <span className="text-base font-semibold tracking-widest uppercase text-neutral-700 dark:text-neutral-900">
                    MINTED
                </span>
                <span className="text-sm font-semibold tracking-widest uppercase text-neutral-700 dark:text-gray-400 dark:bg-neutral-900 bg-gray-100 px-2 rounded-md shadow-sm">
                    {totalMinted}/100
                </span>
            </span>
        </li>
    );
};

const Completed = ({ step, idx }: any) => {
    return (
        <li
            key={step.key + step.name}
            className="relative overflow-hidden lg:flex-1 bg-gray-200/50 dark:bg-neutral-950 lg:m-0 group rounded-lg h-full shadow-sm">
            <span
                className="absolute top-0 left-0 w-0.5 h-full bg-transparent lg:w-full lg:h-[0.075rem] lg:bottom-0 lg:top-auto"
                aria-hidden="true"
            />
            <span
                className={classNames(
                    idx !== 0 ? "" : "",
                    "px-6 py-4 flex items-start text-sm font-medium"
                )}>
                <span className="flex-shrink-0 pt-1">
                    <span className="w-8 h-8 flex items-center justify-center bg-opacity-60 bg-green-900 rounded-full mx-1.5">
                        <CheckIcon className="w-4 h-4 text-neutral-300" aria-hidden="true" />
                    </span>
                </span>
                <span className="mt-1 ml-4 min-w-0 flex flex-col">
                    <span className="text-xs font-semibold tracking-wide uppercase text-neutral-700 dark:text-neutral-500 mb-1">
                        {step.name}
                    </span>
                    <span className="text-xs font-thin lg:font-normal tracking-widest text-neutral-600 text-left">
                        {step.description}
                    </span>
                </span>
            </span>
        </li>
    );
};

const Current = ({ modal, step, idx }: any) => {
    return (
        <li
            key={step.key + step.name}
            className="relative overflow-hidden lg:flex-1 bg-gray-100 hover:bg-neutral-200 dark:hover:bg-neutral-700 dark:bg-neutral-900 rounded-lg transition-all h-full shadow-sm">
            <button
                onClick={modal ? modal : () => {}}
                className="flex items-start justify-start w-full">
                <span
                    className={classNames(
                        idx !== 0 ? "" : "",
                        "px-6 py-4 flex items-start text-sm font-medium w-full"
                    )}>
                    <span className="flex-shrink-0 pt-1">
                        <span className="w-8 h-8 flex items-center justify-center bg-green-600 rounded-full mx-1.5">
                            <span className="text-neutral-950 uppercase tracking-wide">
                                <i className={step.icon} />
                            </span>
                        </span>
                    </span>
                    <span className="mt-1 mx-4 min-w-0 flex flex-col items-start justify-start">
                        <span className="text-xs font-semibold dark:text-neutral-200 text-neutral-800 tracking-wide uppercase mb-1">
                            {step.name}
                        </span>
                        <span className="text-xs font-thin lg:font-normal tracking-widest dark:text-neutral-300 text-neutral-600 text-left">
                            {step.description}
                        </span>
                    </span>
                </span>
            </button>
        </li>
    );
};

const Pending = ({ step, idx }: any) => {
    return (
        <li
            key={step.key + step.name}
            className="relative overflow-hidden lg:flex-1 bg-gray-300 dark:bg-neutral-850 group rounded-lg h-full shadow-sm">
            <span
                className="absolute top-0 left-0 w-[0.075rem] h-full bg-transparent lg:w-full lg:h-[0.075rem] lg:bottom-0 lg:top-auto"
                aria-hidden="true"
            />
            <span
                className={classNames(
                    idx !== 0 ? "" : "",
                    "px-6 py-4 flex items-start text-sm font-medium"
                )}>
                <span className="flex-shrink-0 pt-1">
                    <span className="w-8 h-8 flex items-center justify-center bg-neutral-400 dark:bg-neutral-700 bg-opacity-75 rounded-full mx-1.5">
                        <span className="text-neutral-900 uppercase tracking-wide ">
                            <i className={step.icon} />
                        </span>
                    </span>
                </span>
                <span className="mt-1 ml-4 min-w-0 flex flex-col justify-center">
                    <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-500 tracking-wide uppercase mb-1">
                        {step.name}
                    </span>
                    <span className="text-xs font-thin lg:font-normal tracking-widest text-neutral-700 text-left">
                        {step.description}
                    </span>
                    {/* <span className="text-xs font-thin lg:font-normal tracking-widest text-neutral-700 text-left">{step.name === 'MINT' && +tapeData?.status?.status < 8 ? <DateCountdown deadline={tapeData?.status?.time} /> : <></>}</span> */}
                </span>
            </span>
        </li>
    );
};

export default PreMintTimeline;
