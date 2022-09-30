import React, { useEffect, Fragment } from "react";
import { TapeData } from "../../../models/spaceModel";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "../../../store";
import { generateStatusColors } from "../../../utils/generateTapeLanguage";
import { generateStatusLanguage } from "../../../utils/generateStatusLanguage";
import { TapeStatus } from "../../../models/common";

const TapeInfo = (tapeData: TapeData) => {
    const { tape, id } = useParams<{ space: string; tape: string; id: string }>();
    const dispatch = useDispatch<Dispatch>();
    const openSeaData = useSelector((state: RootState) => state.openSeaModel);
    useEffect(() => {
        dispatch.openSeaModel.getCollectionData(`${tape}-${id}`);
    }, [id]);

    return (
        <div className="xl:mx-auto bg-gray-300 dark:bg-neutral-900 p-1 rounded-2xl xl:my-1 mx-2 shadow-sm">
            <div className="w-full rounded-sm xl:mx-auto">
                <div className="grid lg:grid-cols-8 grid-cols-1 items-center rounded-sm w-full gap-1 lg:gap-1 mx-auto">
                    <div className="col-span-1 inline-flex items-center lg:justify-center justify-start w-full bg-gray-200 dark:bg-neutral-850 px-4 py-1.5 rounded-xl">
                        <span
                            className="col-span-1 uppercase text-neutral-800 dark:text-neutral-500 text-xs tracking-widest"
                            style={{ color: generateStatusColors(tapeData?.status?.status) }}>
                            {generateStatusLanguage(tapeData?.status?.status)}
                        </span>
                    </div>
                    <div className="col-span-1 inline-flex items-center lg:justify-center justify-start gap-x-2 w-full bg-gray-200 dark:bg-neutral-850 px-4 py-1.5 rounded-xl">
                        <span className="font-medium font-sans uppercase text-neutral-700 dark:text-neutral-500 text-xs">
                            bpm:
                        </span>
                        <span className="uppercase tracking-wide font-semibold text-neutral-900 dark:text-amber-500/70 text-xs">
                            {tapeData?.sample?.bpm}
                        </span>
                    </div>
                    {openSeaData && (
                        <Fragment>
                            <div className="col-span-1 inline-flex items-center lg:justify-center justify-start gap-x-2 w-full bg-gray-200 dark:bg-neutral-850 px-4 py-1.5 rounded-xl">
                                <span className="font-medium font-sans uppercase text-neutral-700 dark:text-neutral-500 text-xs truncate overflow-hidden text-ellipsis">
                                    voting power:
                                </span>
                                <span
                                    className={`uppercase font-semibold text-neutral-800 dark:text-neutral-500 text-xs ${
                                        openSeaData?.calculatedVP === 0
                                            ? "dark:text-red-400/70 text-red-500/70"
                                            : "dark:text-green-400 text-green-500"
                                    }`}>
                                    {openSeaData?.calculatedVP}
                                </span>
                            </div>
                            <div className="col-span-1 inline-flex items-center lg:justify-center justify-start gap-x-2 w-full bg-gray-200 dark:bg-neutral-850 px-4 py-1.5 rounded-xl">
                                <span className="font-medium font-sans uppercase text-neutral-700 dark:text-neutral-500 text-xs">
                                    minted:
                                </span>
                                <span
                                    className={`uppercase font-semibold text-neutral-800 dark:text-neutral-500 text-xs ${
                                        openSeaData?.minted === 0
                                            ? "dark:text-red-400/70 text-red-500/70"
                                            : "dark:text-green-400 text-green-500"
                                    }`}>
                                    {openSeaData?.minted}
                                </span>
                            </div>
                            <div className="col-span-1 inline-flex items-center lg:justify-center justify-start gap-x-2 w-full bg-gray-200 dark:bg-neutral-850 px-4 py-1.5 rounded-xl">
                                <span className="font-medium font-sans uppercase text-neutral-700 dark:text-neutral-500 text-xs">
                                    owners:
                                </span>
                                <span
                                    className={`uppercase font-semibold text-neutral-800 dark:text-neutral-500 text-xs ${
                                        openSeaData?.numOfOwners === 0
                                            ? "dark:text-red-400/70 text-red-500/70"
                                            : "dark:text-green-400 text-green-500"
                                    }`}>
                                    {openSeaData?.numOfOwners}
                                </span>
                            </div>
                            <div className="col-span-1 inline-flex items-center lg:justify-center justify-start gap-x-2 w-full bg-gray-200 dark:bg-neutral-850 px-4 py-1.5 rounded-xl">
                                <span className="font-medium font-sans uppercase text-neutral-700 dark:text-neutral-500 text-xs ">
                                    volume:
                                </span>
                                <span
                                    className={`uppercase font-semibold text-neutral-800 dark:text-neutral-500 text-xs truncate overflow-hidden text-ellipsis ${
                                        +openSeaData?.totalVolume.toFixed(0) == 0
                                            ? "dark:text-red-400/70 text-red-500/70"
                                            : "dark:text-green-400 text-green-500"
                                    }`}>
                                    {openSeaData.totalVolume.toFixed(3)}{" "}
                                    <span className="font-medium font-sans uppercase">ETH</span>
                                </span>
                            </div>
                        </Fragment>
                    )}
                    {tapeData?.status?.status >= TapeStatus.MINT_OPEN && (
                        <Fragment>
                            {tapeData?.links?.etherscan && (
                                <a href={tapeData?.links?.etherscan} target="_blank">
                                    <div className="col-span-1 inline-flex items-center lg:justify-center justify-start w-full hover:bg-neutral-100 dark:hover:bg-neutral-950 bg-gray-200 dark:bg-neutral-850 px-4 py-1.5 rounded-xl transition-all">
                                        <span className="font-medium font-sans uppercase text-neutral-700 dark:text-neutral-500 text-xs">
                                            <i className="fak fa-etherscan mr-1.5" />
                                            Etherscan
                                        </span>
                                    </div>
                                </a>
                            )}
                            {tapeData?.links?.opensea ? (
                                <a href={tapeData?.links?.opensea} target="_blank">
                                    <div className="col-span-1 inline-flex items-center lg:justify-center justify-start w-full hover:bg-neutral-100 dark:hover:bg-neutral-900 bg-gray-200 dark:bg-neutral-850 px-4 py-1.5 rounded-xl transition-all">
                                        <span className="font-medium font-sans uppercase text-neutral-600 dark:text-neutral-700 text-xs">
                                            <i className="fak fa-opensea mr-1.5" />
                                            OpenSea
                                        </span>
                                    </div>
                                </a>
                            ) : (
                                <div className="pointer-events-none col-span-1 inline-flex items-center lg:justify-center justify-start w-full bg-gray-400 dark:bg-neutral-950 px-4 py-1.5 rounded-xl transition-all">
                                    <span className="font-medium font-sans uppercase text-neutral-700 dark:text-neutral-500 text-xs animate-pulse">
                                        <i className="fak fa-opensea mr-1.5" />
                                        PENDING
                                    </span>
                                </div>
                            )}
                        </Fragment>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TapeInfo;
