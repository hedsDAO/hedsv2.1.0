import React, { Fragment } from "react";
import Drawer from "react-modern-drawer";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "../../../store";
import { useMoralis } from "react-moralis";
import { Modals } from "../../../models/globalModel";
import "react-modern-drawer/dist/index.css";
import DarkModeToggle from "../../../common/toggles/DarkModeToggle/DarkModeToggle";

const MobileDrawer = ({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: Function }) => {
	const history = useHistory();
	const userData = useSelector((state: RootState) => state.userModel);
	const { pathname } = useLocation<{ pathname: string }>();
	const dispatch = useDispatch<Dispatch>();
	const { isAuthenticated, user } = useMoralis();
	const toggleDrawer = () => {
		setIsOpen((prevState: boolean) => !prevState);
	};
	const navigation = [
		{ name: "home", href: "/" },
		{ name: "explore", href: "/explore" },
		{ name: "about", href: "/about" },
	];
	return (
		<Drawer open={isOpen} onClose={toggleDrawer} direction="top" className="h-auto">
			{userData && (
				<Fragment>
					<div className="flex flex-col justify-center items-stretch gap-y-2 bg-[#f2f0e9] dark:bg-neutral-975 max-w-screen">
						<div className="flex items-center justify-center gap-x-4 gap-y-2 mt-2 py-6">
							<div className="flex flex-col justify-center items-stretch h-full">
								<div className="flex flex-col justify-center items-center text-2xl font-base font-serif lg:max-w-xs">
									{user?.attributes?.ethAddress && <button onClick={() => {
										setIsOpen(false);
										history.push("/profile")
									}} className="rounded-sm uppercase text-neutral-800 dark:text-neutral-400 tracking-widest text-center lg:text-center ml-1">
										{user?.attributes?.ethAddress?.slice(0, 6)}
									</button>}
								</div>
								{userData?.twitterHandle && (
									<div className="flex flex-col justify-center items-center text-xs font-serif font-thin lg:max-w-xs mt-0.5 mb-2">
										<span className="rounded-sm uppercase text-neutral-800 dark:text-neutral-500 tracking-widest text-center lg:text-left">
											<i className="fa-brands fa-twitter mr-1" />
											{userData?.twitterHandle}
										</span>
									</div>
								)}
								<div className="flex items-center gap-x-2.5 h-full pt-2">
								{pathname === "/" ? <></> : <DarkModeToggle />}
									<button
										key={pathname + "connect"}
										onClick={
											isAuthenticated
												? () => {
													setIsOpen(false);
													history.push("/profile")
												}
												: () => {
													setIsOpen(false);
													dispatch.globalModel.setModal({ modal: Modals.CONNECT, open: true, locked: false })
												}
										}
										className={
											pathname === "/profile"
												? "inline-flex px-8 py-0.5 text-sm hover:bg-indigo-500 dark:hover:bg-fuchsia-800 dark:bg-fuchsia-600 bg-indigo-500 spotlight-gradient text-white font-serif rounded-sm uppercase transition-all"
												: "inline-flex px-8 py-0.5 text-sm hover:bg-indigo-500 dark:hover:bg-fuchsia-800 dark:bg-fuchsia-600 bg-indigo-500 text-white font-serif rounded-sm uppercase transition-all"
										}>
										<span className="my-auto tracking-widest">
											{isAuthenticated ? user?.attributes?.ethAddress.slice(0, 5) : "connect"}
										</span>
									</button>
								</div>
							</div>
						</div>
						<div className="flex justify-center items-center gap-x-8 px-6 w-full bg-neutral-700 dark:bg-neutral-950 min-w-screen max-w-screen max-h-[27%] mt-auto py-4">
							{navigation.map((item, i) => (
								<Link onClick={() => setIsOpen(false)} to={item.href} key={item.href + i}>
									{pathname === item.href ? (
										<div className="hover:text-white text-center tracking-widest uppercase text-amber-500 text-sm min-w-[9ch] max-w-[9ch]">
											{item.name}
										</div>
									) : (
										<div className="hover:text-amber-500 text-center tracking-widest uppercase text-neutral-400 text-sm min-w-[9ch] max-w-[9ch]">
											{item.name}
										</div>
									)}
								</Link>
							))}
						</div>
					</div>
				</Fragment>
			)}
		</Drawer>
	);
};

export default MobileDrawer;
