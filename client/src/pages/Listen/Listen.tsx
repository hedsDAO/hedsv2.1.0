import React, { useEffect, Fragment, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "../../store";
import SampleContainer from "../../components/Listen/SampleContainer/SampleContainer";
import TapeHeader from "../../components/Listen/TapeHeader/TapeHeader";
import TapeInfo from "../../components/Listen/TapeInfo/TapeInfo";
import TapeArtists from "../../components/Listen/TapeArtists/TapeArtists";
import TapeTimeline from "../../components/Listen/TapeTimeline/TapeTimeline";
import { PreMintStatus, TapeStatus } from "../../models/common";
import PreMintTimeline from "../../components/Listen/PreMintTimeline/PreMintTimeline";
import CollabTapeInfo from "../../components/Listen/CollabTapeInfo/CollabTapeInfo";
import axios from "axios";

const Listen = () => {
    const { space, tape, id } = useParams<{ space?: string; tape: string; id: string }>();
    const dispatch = useDispatch<Dispatch>();
    const spaceData = useSelector((state: RootState) => state.spaceModel);
    const audioData = useSelector((state: RootState) => state.audioModel);
    const tapeData = useSelector((state: RootState) => state.tapeModel);
    const [totalMinted, setTotalMinted] = useState();
    useEffect(() => {
        dispatch.spaceModel.getSpaceData();
        dispatch.audioModel.getTapeData([space, tape]);
        dispatch.audioModel.getTrackData([space, tape]);
        if (spaceData?.[tape]?.[id]?.sample) dispatch.audioModel.getSamples([space, tape]);
        dispatch.globalModel.setSpaceTapeId([space, tape, id]);
    }, []);
    useEffect(() => {
        if (spaceData?.[tape]?.[id]?.sample) dispatch.audioModel.getSamples([space, tape]);
        dispatch.globalModel.setSpaceTapeId([space, tape, id]);
        dispatch.audioModel.getTapeData([space, tape]);
        dispatch.audioModel.getTrackData([space, tape]);
        if (spaceData?.[tape]?.[id]?.sample) dispatch.audioModel.getSamples([space, tape]);
    }, [id, tape]);

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
                    setTotalMinted(response.data.total);
                })
                .catch(function (error) {
                    console.error(error);
                    return 0;
                });
        }
    }, []);
    return (
        <Fragment>
            {spaceData && audioData && tapeData && (
                <div className="flex flex-col max-w-7xl mx-auto xl:gap-y-2 gap-y-1">
                    <div className="lg:w-full">
                        <TapeHeader {...spaceData?.[tape]?.[id]} />
                    </div>
                    {+spaceData?.[tape]?.[id]?.status?.status >= TapeStatus.MINT_OPEN && (
                        <div className="xl:inline hidden">
                            <TapeInfo {...spaceData?.[tape]?.[id]} />
                        </div>
                    )}
                    {tape === "collabtape" && (
                        <div className="xl:inline hidden xl:mt-1">
                            <CollabTapeInfo
                                tapeData={spaceData?.[tape]?.[id]}
                                totalMinted={totalMinted}
                            />
                        </div>
                    )}
                    <div className="w-full xl:rounded-none rounded-md">
                        {+spaceData?.[tape]?.[id]?.status?.status >= TapeStatus.SAMPLE_OPEN &&
                            spaceData?.[tape]?.[id]?.sample?.audio && (
                                <div className="">
                                    <SampleContainer {...spaceData?.[tape]?.[id]} />
                                </div>
                            )}
                    </div>
                    {+spaceData?.[tape]?.[id]?.status?.status < TapeStatus.MINT_CLOSE &&
                        tape === "hedstape" && (
                            <div className="lg:w-full rounded-xl bg-gray-300 dark:bg-neutral-975 xl:mx-0 mx-2">
                                <TapeTimeline {...spaceData?.[tape]?.[id]} />
                            </div>
                        )}
                    {id === "goodsociety" &&
                    +spaceData?.[tape]?.[id]?.status?.status ===
                        PreMintStatus.PUBLIC_MINT_OPEN ? (
                        <div className="lg:w-full rounded-xl bg-gray-300 dark:bg-neutral-975 xl:mx-0 mx-2 xl:mb-1">
                            <PreMintTimeline {...spaceData?.[tape]?.[id]} />
                        </div>
                    ) : (
                        <></>
                    )}
                    {+spaceData?.[tape]?.[id]?.status?.status >= TapeStatus.MINT_OPEN ||
                    id === "goodsociety" ? (
                        <div className="lg:w-full xl:mx-0 mx-2">
                            <TapeArtists {...audioData?.tracks?.[id]} />
                        </div>
                    ) : (
                        <></>
                    )}
                    {+spaceData?.[tape]?.[id]?.status?.status >= TapeStatus.MINT_OPEN && (
                        <div className="xl:hidden inline xl:mt-0 mt-2">
                            <TapeInfo {...spaceData?.[tape]?.[id]} />
                        </div>
                    )}
                    {tape === "collabtape" && (
                        <div className="xl:hidden inline xl:mt-0 mt-2">
                            <CollabTapeInfo
                                tapeData={spaceData?.[tape]?.[id]}
                                totalMinted={totalMinted}
                            />
                        </div>
                    )}
                </div>
            )}
        </Fragment>
    );
};

export default Listen;
