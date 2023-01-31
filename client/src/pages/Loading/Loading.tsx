import React from "react";
import { RootState } from "../../store";
import { useSelector } from "react-redux";

const Loading = () => {
    const isUnderConstruction = useSelector(
        (state: RootState) => state.exploreModel.underConstruction
    );
    return (
        <div className="min-h-[100vh] min-w-screen flex items-center justify-center">
            {isUnderConstruction && (
                <div className="flex flex-col items-center justify-center gap-2">
                    <div className="mb-4 text-neutral-900 dark:text-neutral-300 font-thin flex items-center gap-2">
                        <span className="text-sm">heds v2.1.0</span>
                        <i className="fa-light fa-arrow-right-long text-xs"></i>
                        <span className="text-sm">v3.0.0</span>
                    </div>
                    <i className="fas fa-circle-notch fa-spin text-neutral-900 dark:text-neutral-300 text-3xl"></i>
                    <p className="text-neutral-900 dark:text-neutral-300 font-thin mt-4">
                        under construction
                        <span className="one">.</span>
                        <span className="two">.</span>
                        <span className="three">.</span>
                    </p>
                </div>
            )}
        </div>
    );
};

export default Loading;
