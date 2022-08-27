import React, { Fragment, useState } from "react";
import { Dialog, Listbox, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, Dispatch } from "../../../store";
import { useMoralis } from "react-moralis";
import LoadingIcon from "../../svg/LoadingIcon/LoadingIcon";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
const contractAbi = require("../../../data/whitelists/abi/collabTAPE01.json");
const quantities = [{ value: "1" }, { value: "3" }];
var ethers = require("ethers");

const PublicMintModal = () => {
    const { web3, enableWeb3, isWeb3Enabled, user } = useMoralis();
    const { id, tape } = useSelector((state: RootState) => state.globalModel);
    const [hasMinted, setHasMinted] = useState<boolean>(false);
    const [isMinting, setIsMinting] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [selected, setSelected] = useState({ value: "0" });
    const [txnHash, setTxnHash] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const currentTape = useSelector((state: RootState) => state.tapeModel).tapes?.[tape]?.[id];
    const { locked, open } = useSelector((state: RootState) => state.globalModel.modal);
    const dispatch = useDispatch<Dispatch>();

    const handleMint = async () => {
        setError("");
        setIsLoading(true);
        if (web3 && user) {
            const contract = new ethers.Contract(
                "0xEeB431Caa15B526f48Ee4DB3697FE57EC8223A8e",
                contractAbi,
                web3.getSigner()
            );
            try {
                setIsMinting(true);
                const txn = await contract.mint(parseInt(selected.value), {
                    value: `${selected.value}00000000000000000`,
                });
                setTxnHash(txn.hash);
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
                    locked && !hasMinted
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
                                        <div className="flex flex-col h-full items-center justify-center py-3">
                                            <h5 className="text-base font-semibold text-gray-200 lg:text-xl text-center py-3">
                                                {currentTape?.tape?.name}
                                            </h5>

                                            <span className="uppercase font-normal ml-2 text-neutral-400">
                                                Public Mint
                                            </span>
                                            <div className="mb-2">
                                                <div className="mt-3 flex justify-center flex-col">
                                                    <div className="flex flex-col items-stretch justify-center mx-auto self-center my-10 py-5 max-w-[10rem] max-h-[10rem]">
                                                        <img
                                                            className="min-h-[10rem] min-w-[10rem] object-cover border-[0.25px] border-neutral-700"
                                                            src={currentTape?.tape?.image}
                                                            alt="submission tape image"
                                                        />
                                                        <span className="uppercase font-normal text-sm text-gray-300 text-center bg-black rounded-md px-3 py-1">
                                                            <span className="uppercase font-semibold text-sm mx-auto text-neutral-300 text-center rounded-lg mr-2">
                                                                PRICE
                                                            </span>
                                                            0.1 ETH
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <Listbox value={selected} onChange={setSelected}>
                                                <div className="relative mt-1 mb-6">
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
                                            {error && (
                                                <span className="text-xs uppercase font-semibold mb-2 text-red-500 text-center px-10">
                                                    {error}
                                                </span>
                                            )}
                                            <div className="gap-x-2 flex justify-center items-stretch pt-2 my-3">
                                                {isMinting ? (
                                                    <div className="flex flex-col items-center justify-center ">
                                                        <span className="font-semibold text-sm uppercase text-neutral-300 animate__animated animate__fadeInUp mb-3">
                                                            transaction in progress...
                                                        </span>
                                                        {txnHash && (
                                                            <a
                                                                className="animate__animated animate__fadeInUp mb-5"
                                                                href={`https://etherscan.io/tx/${txnHash}`}
                                                                target="_blank">
                                                                <button className="px-4 py-1 text-sm bg-neutral-850 text-neutral-400 font-thin inline-flex items-center rounded-sm focus:outline-none hover:bg-neutral-800 transition-all">
                                                                    VIEW TXN
                                                                </button>
                                                            </a>
                                                        )}
                                                        <LoadingIcon />
                                                    </div>
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
                                                                +selected.value === 0 || isLoading
                                                                    ? true
                                                                    : false
                                                            }
                                                            onClick={
                                                                isWeb3Enabled
                                                                    ? () => handleMint()
                                                                    : () => enableWeb3()
                                                            }
                                                            className="px-4 py-1 text-sm bg-green-900 hover:bg-green-800 text-neutral-400 font-thin inline-flex items-center rounded-sm focus:outline-none disabled:bg-neutral-700">
                                                            {isWeb3Enabled ? "MINT" : "CONNECT"}
                                                        </button>
                                                    </Fragment>
                                                )}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center gap-y-1 py-3 animate__animated animate__fadeIn">
                                            <span className="uppercase font-normal ml-2 text-neutral-400">
                                                MINTED{" "}
                                                <i className="fa-solid fa-circle-check text-green-500 ml-1"></i>
                                            </span>
                                            <div className="flex gap-x-2 justify-center items-center mt-2">
                                                {txnHash && (
                                                    <a
                                                        href={`https://etherscan.io/tx/${txnHash}`}
                                                        target="_blank">
                                                        <button className="px-4 py-1 text-sm bg-neutral-850 text-neutral-400 font-thin inline-flex items-center rounded-sm focus:outline-none hover:bg-neutral-800 transition-all">
                                                            VIEW TXN
                                                        </button>
                                                    </a>
                                                )}
                                                <a
                                                    href={`https://opensea.io/collection/collabtape-goodsociety`}
                                                    target="_blank">
                                                    <button className="px-4 py-1 text-sm bg-neutral-850 text-neutral-400 font-thin inline-flex items-center rounded-sm focus:outline-none hover:bg-neutral-800 transition-all">
                                                        OPENSEA
                                                    </button>
                                                </a>
                                            </div>
                                        </div>
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

export default PublicMintModal;
