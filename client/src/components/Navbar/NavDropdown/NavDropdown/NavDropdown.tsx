import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useMoralis } from "react-moralis";
import { DotsHorizontalIcon } from "@heroicons/react/solid";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "../../../../store";
import { Modals } from "../../../../models/globalModel";
import { useHistory, useLocation } from "react-router-dom";
import { classNames } from "../../../../utils/classNames";

const NavDropdown = () => {
	const { pathname } = useLocation<{ pathname: string }>();
	const history = useHistory();
	const userData = useSelector((state: RootState) => state.userModel);
	const dispatch = useDispatch<Dispatch>();
	const { logout } = useMoralis();
	return (
		<Menu as="div" className="relative inline-block text-left">
			<div>
				<Menu.Button className="inline-flex items-center justify-center px-3.5 py-1.5 ml-2 hover:bg-neutral-800 bg-neutral-700 text-neutral-200 font-serif rounded-full uppercase transition-all">
					{({ open }) => (
						<DotsHorizontalIcon
							className={open ? "h-4 w-4 rotate-180 ease-out transition-all" : "h-4 w-4 ease-in transition-all"}
						/>
					)}
				</Menu.Button>
			</div>
			<Transition
				as={Fragment}
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95">
				<Menu.Items className="origin-top-right absolute right-0 mt-3 w-32 rounded-lg shadow-lg bg-neutral-950 ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
					<div className="py-1">
						<Menu.Item>
							{() => (
								<button
									onClick={() => dispatch.globalModel.setModal({ open: true, modal: Modals.SETTINGS, locked: true })}
									className={classNames(
										"bg-neutral-950 hover:text-neutral-100 text-neutral-300 block px-4 py-2 text-sm transition-all ml-auto"
									)}>
									settings
								</button>
							)}
						</Menu.Item>
						{userData?.twitterHandle?.length === 0 && (
							<Menu.Item as={Fragment}>
								{() => (
									<button
										onClick={() => dispatch.globalModel.setModal({ open: true, modal: Modals.TWITTER, locked: true })}
										className={classNames(
											"bg-neutral-950 hover:text-neutral-100 text-neutral-300 block px-4 py-2 text-sm transition-all ml-auto"
										)}>
										verify
									</button>
								)}
							</Menu.Item>
						)}
						<Menu.Item>
							{() => (
								<button
									onClick={() => {
										logout();
										if (pathname === "/profile") history.push("/explore");
									}}
									className={classNames(
										"bg-neutral-950 hover:text-neutral-100 text-neutral-300 block px-4 py-2 text-sm transition-all ml-auto"
									)}>
									logout
								</button>
							)}
						</Menu.Item>
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	);
};

export default NavDropdown;
