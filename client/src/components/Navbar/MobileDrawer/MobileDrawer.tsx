import React, { Fragment } from "react";
import Drawer from "react-modern-drawer";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "../../../store";
import { useMoralis } from "react-moralis";
import profileTestImg from "../../../../../public/2.png";
import { Modals } from "../../../models/globalModel";
import "react-modern-drawer/dist/index.css";

const MobileDrawer = ({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: Function }) => {
	const history = useHistory();
	const userData = useSelector((state: RootState) => state.userModel);
	const { pathname } = useLocation<{ pathname: string }>();
	const dispatch = useDispatch<Dispatch>();
	const { isAuthenticated, user, logout } = useMoralis();
	const toggleDrawer = () => {
		setIsOpen((prevState: boolean) => !prevState);
	};
	const navigation = [
		{ name: "home", href: "/" },
		{ name: "explore", href: "/explore" },
		{ name: "about", href: "/about" },
	];
	return (
		<Drawer open={isOpen} onClose={toggleDrawer} direction="top" className="">
			{userData && (
				<Fragment>
					<div className="flex flex-col justify-center items-stretch gap-y-2 bg-neutral-975 h-full max-w-screen">
						<div className="flex items-center justify-center gap-x-4 gap-y-2 mt-2 h-[78%]">
							<Link to="/profile">
								<img
									onClick={() => setIsOpen(false)}
									className="object-fill w-[6.75rem] h-[6.75rem] bg-neutral-900 border-neutral-700 border-[0.25px] p-1 rounded-full mx-auto"
									src={userData.profilePicture || profileTestImg}
								/>
							</Link>
							<div className="flex flex-col justify-evenly items-start">
								<div className="flex flex-col justify-center items-start text-2xl font-base font-serif lg:max-w-xs">
									<span className="rounded-sm uppercase text-neutral-400 tracking-widest text-center lg:text-left">
										{user?.attributes?.ethAddress?.slice(0, 6)}
									</span>
								</div>
								{userData?.twitterHandle && (
									<div className="flex flex-col justify-center items-start text-xs font-serif font-thin lg:max-w-xs mt-0.5 mb-2">
										<span className="rounded-sm uppercase text-neutral-500 tracking-widest text-center lg:text-left">
											<i className="fa-brands fa-twitter mr-1" />
											{userData?.twitterHandle}
										</span>
									</div>
								)}
								<div>
									<button
										onClick={
											isAuthenticated
												? () => {
														setIsOpen(false);
														history.push("/profile");
												  }
												: () => {
														setIsOpen(false);
														dispatch.globalModel.setModal({ modal: Modals.CONNECT, open: true, locked: false });
												  }
										}
										className={
											pathname === "profile"
												? "inline-flex px-10 py-1 text-xs hover:bg-fuchsia-800 spotlight-gradient text-neutral-200 font-serif rounded-full uppercase transition-all"
												: "inline-flex px-10 py-1 text-xs hover:bg-fuchsia-800 bg-fuchsia-700 text-neutral-200 font-serif rounded-full uppercase transition-all"
										}>
										<span className="my-auto tracking-widest">{isAuthenticated ? "profile" : "connect"}</span>
									</button>
									{isAuthenticated && (
										<button
											onClick={() => {
												logout();
												dispatch.userModel.clearUserData();
												if (pathname === "/profile") history.push("/explore");
												setIsOpen(false);
											}}
											className="inline-flex items-center justify-center ml-3 py-2 text-sm text-red-400 text-opacity-50 font-serif rounded-full uppercase transition-all">
											<i className="fa-regular fa-arrow-up-left-from-circle my-auto text-xs"></i>
										</button>
									)}
								</div>
							</div>
						</div>
						<div className="flex justify-center items-center gap-x-8 px-6 w-full bg-neutral-975 min-w-screen max-w-screen max-h-[22%] mt-auto py-2">
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
