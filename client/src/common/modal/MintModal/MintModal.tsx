import React, { Fragment, useState } from "react";
import { Dialog, Transition, Listbox } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, Dispatch } from "../../../store";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { useMoralis } from "react-moralis";
import LoadingIcon from "../../svg/LoadingIcon/LoadingIcon";
import { useAccount, useConnect } from "wagmi";
import { SoundClient } from "@soundxyz/sdk";
const contractAbi = require("../../../data/whitelists/abi/hedsTAPE08.json");
// import { getContractAbi } from "../../../utils/getContractAbi";
var ethers = require("ethers");

const quantities = [{ value: "1" }, { value: "3" }];

const MintModal = () => {
    const { web3, enableWeb3, isWeb3Enabled } = useMoralis();
    const { id, tape } = useSelector((state: RootState) => state.globalModel);
    const [hasMinted, setHasMinted] = useState<boolean>(false);
    const [isMinting, setIsMinting] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [selected, setSelected] = useState({ value: "0" });
    const currentTape = useSelector((state: RootState) => state.spaceModel)?.[tape]?.[id];
    const { locked, open } = useSelector((state: RootState) => state.globalModel.modal);
    const dispatch = useDispatch<Dispatch>();
    const { connect } = useConnect();
    const { isConnected, connector } = useAccount();

    const mintEdition = async () => {
        setError("");
        setIsLoading(true);
        if (!isConnected) await connect();
        const signer = await connector?.getSigner();
        console.log(signer);
        const client = SoundClient({ signer });
        const editionAddress = "0x9f396644EC4b2A2bc3C6Cf665d29165Dde0e83F1";
        const mintSchedule = (await client.activeMintSchedules({ editionAddress })).shift();
        console.log(mintSchedule);
        if (!mintSchedule) {
            setIsLoading(false);
            throw Error(`No active mint schedule available!`);
        }
        try {
            const mintTransaction = await client.mint({ mintSchedule, quantity: +selected.value });
            setIsLoading(false);
            setIsMinting(true);
            await mintTransaction.wait();
            setHasMinted(true);
            return mintTransaction.hash;
        } catch {
            throw Error(`Unable to mint edition.`);
        }
    };

    const handleMint = async () => {
        setError("");
        setIsLoading(true);
        if (web3 && currentTape?.tape?.contract) {
            console.log(currentTape?.tape?.contract);
            const contract = new ethers.Contract(
                currentTape?.tape?.contract,
                contractAbi,
                web3.getSigner()
            );
            try {
                setIsMinting(true);
                const txn = await contract.mintHead(parseInt(selected.value), {
                    value: `${selected.value}00000000000000000`,
                });
                const receipt = await txn.wait();
                console.log(receipt);
                setHasMinted(true);
            } catch (err: any) {
                setIsMinting(false);
                console.log(err);
                if (err?.message?.includes("insufficient funds")) {
                    setError("Insufficient funds for minting. Please try again.");
                } else setError("There was a problem minting your tapes. Please try again.");
            }
        }
        setIsLoading(false);
    };
    return (
        <Transition appear show={open} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-[60]"
                onClose={
                    locked && selected.value !== "0"
                        ? () => {}
                        : () => dispatch.globalModel.setModalVisibility(false)
                }>
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex bg-neutral-950/90 min-h-full items-center justify-center text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-300"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95">
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg align-middle transition-all mt-5">
                                <div className="relative z-50 inline-block align-bottom bg-neutral-950 border-[0.25px] border-neutral-700 rounded-lg py-4 lg:px-5 px-20 text-left overflow-hidden shadow-xl transform transition-all sm:align-middle max-w-full sm:max-w-md sm:w-full">
                                    {!hasMinted ? (
                                        <div className="flex flex-col h-full items-center justify-center py-5">
                                            <h5 className="text-base font-semibold text-gray-200 lg:text-xl text-center py-5">
                                                {currentTape?.tape?.name}
                                                <span className="uppercase font-normal ml-2 text-neutral-400">
                                                    Mint
                                                </span>
                                            </h5>
                                            <div className="mb-2">
                                                <div className="mt-5 flex justify-center flex-col gap-y-3">
                                                    <div className="mx-auto self-center mb-10 py-5 max-w-[10rem] max-h-[10rem]">
                                                        <img
                                                            className="min-h-[10rem] min-w-[10rem] object-cover border-[0.25px] border-neutral-700"
                                                            src={currentTape?.tape?.image}
                                                            alt="submission tape image"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <span className="text-neutral-400 text-xs uppercase font-semibold mb-2">
                                                select quantity
                                            </span>
                                            <Listbox value={selected} onChange={setSelected}>
                                                <div className="relative mt-1 mb-10">
                                                    <Listbox.Button className="relative w-full cursor-default rounded-sm bg-neutral-975 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-fuchsia-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                                        <span className="block text-neutral-300 truncate lg:text-base text-sm">
                                                            {selected.value}
                                                        </span>
                                                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                            <SelectorIcon
                                                                className="h-5 w-5 text-gray-400"
                                                                aria-hidden="true"
                                                            />
                                                        </span>
                                                    </Listbox.Button>
                                                    <Transition
                                                        as={Fragment}
                                                        leave="transition ease-in duration-100"
                                                        leaveFrom="opacity-100"
                                                        leaveTo="opacity-0">
                                                        <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-sm bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                            {quantities.map((q, idx: number) => (
                                                                <Listbox.Option
                                                                    key={idx}
                                                                    className={({ active }) =>
                                                                        `relative cursor-default select-none py-2 pl-3 lg:text-base text-sm ${
                                                                            active
                                                                                ? "bg-amber-100 text-neutral-600"
                                                                                : "text-neutral-900"
                                                                        }`
                                                                    }
                                                                    value={q}>
                                                                    {({ selected }) => (
                                                                        <>
                                                                            <span
                                                                                className={`block truncate lg:text-base text-sm ${
                                                                                    selected
                                                                                        ? "font-medium"
                                                                                        : "font-normal"
                                                                                }`}>
                                                                                {q.value}
                                                                            </span>
                                                                            {selected ? (
                                                                                <span className="absolute inset-y-0 left-0 flex items-center pl-7 text-neutral-700">
                                                                                    <CheckIcon
                                                                                        className="h-4 w-4"
                                                                                        aria-hidden="true"
                                                                                    />
                                                                                </span>
                                                                            ) : null}
                                                                        </>
                                                                    )}
                                                                </Listbox.Option>
                                                            ))}
                                                        </Listbox.Options>
                                                    </Transition>
                                                </div>
                                            </Listbox>
                                            <span
                                                className={`${
                                                    +selected.value > 0 && "text-green-500"
                                                } text-sm uppercase font-semibold mb-2 text-neutral-400`}>
                                                {(+selected.value * 0.1).toFixed(2) || 0} ETH
                                            </span>
                                            {error && (
                                                <span className="text-xs uppercase font-semibold mb-2 text-red-500 text-center">
                                                    {error}
                                                </span>
                                            )}
                                            <div className="gap-x-2 flex justify-center items-stretch pt-4 mt-5">
                                                {isMinting ? (
                                                    <LoadingIcon />
                                                ) : (
                                                    <Fragment>
                                                        <button
                                                            disabled={isLoading}
                                                            onClick={() =>
                                                                dispatch.globalModel.setModalVisibility(
                                                                    false
                                                                )
                                                            }
                                                            className="px-4 py-1 text-sm bg-neutral-850 text-neutral-400 font-thin inline-flex items-center rounded-sm focus:outline-none hover:bg-neutral-800 transition-all">
                                                            BACK
                                                        </button>
                                                        <button
                                                            disabled={
                                                                +selected.value === 0
                                                                    ? true
                                                                    : isLoading
                                                                    ? true
                                                                    : false
                                                            }
                                                            onClick={async () => {
                                                                if (isWeb3Enabled) {
                                                                    if (id === "10") {
                                                                        await mintEdition();
                                                                    } else await handleMint();
                                                                } else enableWeb3();
                                                            }}
                                                            className="px-4 py-1 text-sm bg-green-900 hover:bg-green-800 text-neutral-400 font-thin inline-flex items-center rounded-sm focus:outline-none disabled:bg-neutral-700">
                                                            {isLoading ? (
                                                                <i className="fas fa-circle-notch fa-spin text-black" />
                                                            ) : isWeb3Enabled ? (
                                                                "MINT"
                                                            ) : (
                                                                "CONNECT"
                                                            )}
                                                        </button>
                                                    </Fragment>
                                                )}
                                            </div>
                                        </div>
                                    ) : (
                                        <h5 className="text-base font-semibold text-gray-200 lg:text-xl text-center py-5">
                                            {currentTape?.tape?.name}
                                            <span className="uppercase font-normal ml-2 text-neutral-400">
                                                Minted{" "}
                                                <i className="fa-solid fa-circle-check text-green-500 ml-1"></i>
                                            </span>
                                        </h5>
                                    )}
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default MintModal;
