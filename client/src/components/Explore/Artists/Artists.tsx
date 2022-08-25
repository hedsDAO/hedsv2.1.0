import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Dispatch, RootState } from "../../../store";

const Artists = () => {
    const dispatch = useDispatch<Dispatch>();
    const audioData = useSelector((state: RootState) => state.audioModel);
    const tapeData = useSelector((state: RootState) => state.tapeModel);
    useEffect(() => {
        dispatch.tapeModel.getTapes()
        dispatch.audioModel.getSamples(["heds", "hedstape"]);
    }, []);
    console.log(tapeData?.tapes?.["heds"]?.["hedstape"]);
    return (
        <div className="max-w-7xl w-full mx-auto my-5 px-2 mb-20">
            {audioData?.samples && 
                <Fragment>
                    <div className="xl:max-w-7xl flex lg:flex-row flex-col justify-end mx-auto items-center pb-5 lg:px-1 px-6 gap-y-4 mt-10 xl:mt-20">
                        <div className="xl:mx-0 mx-2 xl:my-0 text-center lg:text-right">
                            <h1 className="text-4xl tracking-wide font-extrabold text-neutral-900 dark:text-neutral-300">
                                CURATORS
                            </h1>
                            <p className="mt-3 text-sm lg:text-base text-neutral-500 xl:whitespace-nowrap xl:max-w-full max-w-sm">
                                The tapes are built from an artist sample. View the roster of
                                talented artists and the samples provided.
                            </p>
                        </div>
                    </div>
                    <div className="col-span-12 items-center justify-items-center place-items-center rounded-md p-1">
                        <ul className="col-span-12 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 place-content-center items-center gap-y-1 gap-x-1 mt-4 max-w-7xl mx-auto">
                            {tapeData?.tapes &&
                                Object.values(tapeData?.tapes?.["hedstape"]).map((tape, index: number) => (
                                    <li
                                        key={tape.sample.wallet + tape.sample.artist}
                                        className="flex col-span-1 text-center rounded-lg bg-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-700 hover:bg-neutral-400 transition-all">
                                        <Link to={`/listen/heds/hedstape/${index + 1}`}>
                                            <div className="flex-1 flex flex-col items-start p-2">
                                                <img
                                                    className="lg:w-full lg:h-full flex-shrink-0 mx-auto rounded-lg"
                                                    src={tape.sample.image}
                                                    alt=""
                                                />
                                                <div className="flex flex-col items-start justify-evenly px-2 pb-2">
                                                    <h3 className="mt-4 text-neutral-975 dark:text-neutral-300 text-sm font-medium">
                                                        {tape.sample.artist}
                                                    </h3>
                                                    <dl className="mt-1 flex-grow flex flex-col justify-between">
                                                        <dd className="text-neutral-700 dark:text-gray-400 text-sm">
                                                            {tape.sample.wallet.slice(0, 5) + "..."}
                                                        </dd>
                                                    </dl>
                                                    <span className="text-gray-700 dark:text-gray-400 text-xs mt-1 font-semibold">{`hedsTAPE 0${
                                                        index + 1
                                                    }`}</span>
                                                </div>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                        </ul>
                    </div>
                </Fragment>
            }
        </div>
    );
};

export default Artists;
