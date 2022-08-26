import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { TapeData } from "../../../models/spaceModel";
import { SpaceData } from "../../../models/spaceModel";

const Tapes = (tapeData: SpaceData) => {
    const tapeNames = Object.keys(tapeData);
    const tapeContent = Object.values(tapeData).map((tape) => Object.values(tape));

    return (
        <Fragment>
            <div className="grid grid-cols-12 max-w-7xl mx-auto w-full gap-x-2 xl:px-0 lg:px-2 px-2">
                <div className="col-span-12 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 place-content-center items-center gap-y-2 gap-x-2 mt-4">
                    <>
                        {tapeNames?.length &&
                            tapeContent?.length &&
                            tapeContent.map((allTracks, index: number) => {
                                return allTracks?.map((tape: TapeData) => {
                                    return (
                                        <div
                                            key={tape?.tape?.contract + tape?.tape?.name}
                                            className="flex col-span-1 bg-gray-300 dark:bg-neutral-800 dark:hover:bg-neutral-700 hover:bg-neutral-200 transition-all p-2 rounded-md shadow-sm">
                                            <Link to={tape?.links?.route}>
                                                <div className="overflow-hidden lg:aspect-none transition-all object-cover rounded-md flex flex-col gap-y-1">
                                                    <img
                                                        src={tape?.tape?.image}
                                                        className={`w-full h-full object-center object-cover lg:w-full lg:h-full group-hover:grayscale-0 rounded-md mb-1`}
                                                    />
                                                    <div className="text-neutral-900 dark:text-neutral-400 text-sm font-semibold pl-1.5 tracking-wide transition-all">
                                                        {tape?.tape?.name}
                                                    </div>
                                                    <div className="text-neutral-700 dark:text-gray-300 text-sm font-thin pl-1.5 tracking-wide pb-1 transition-all">
                                                        {tapeNames[index]}
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    );
                                });
                            })}
                    </>
                </div>
            </div>
        </Fragment>
    );
};
export default Tapes;
