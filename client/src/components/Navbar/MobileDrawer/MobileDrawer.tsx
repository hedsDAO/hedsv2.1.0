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
		<Drawer open={isOpen} onClose={toggleDrawer} direction="top" className="bg-neutral-950">
			{userData && (
				<Fragment>
					<div className="flex flex-col justify-evenly items-center bg-neutral-950 h-full gap-y-4 pt-5 -mr-2">
						<div className="lg:mx-auto lg:max-w-7xl lg:px-6 lg:grid lg:grid-cols-2 gap-x-4">
							<div className="flex items-center justify-center mx-auto w-full">
								<Link to="/profile">
									<img
										onClick={() => setIsOpen(false)}
										className="object-fill w-24 h-24 bg-neutral-900 border-fuchsia-900 border p-1 rounded-full lg:ml-auto mx-auto"
										src={userData.profilePicture || profileTestImg}
									/>
								</Link>
							</div>
						</div>
						<div className="flex justify-center">
							{isAuthenticated && (
								<button
									onClick={() => {
										logout();
										dispatch.userModel.clearUserData();
										if (pathname === "/profile") history.push("/explore");
										setIsOpen(false);
									}}
									className="inline-flex items-center justify-center px-3 mr-2 text-sm hover:bg-gray-900 bg-gray-800 text-neutral-200 font-serif rounded-full uppercase transition-all">
									<i className="fa-regular fa-arrow-up-left-from-circle my-auto text-xs -ml-0.25"></i>
								</button>
							)}
							<button
								onClick={
									isAuthenticated
										? () => {
												setIsOpen(false);
										  }
										: () => {
												setIsOpen(false);
												dispatch.globalModel.setModal({ modal: Modals.CONNECT, open: true, locked: false });
										  }
								}
								className={
									pathname === "profile"
										? "inline-flex px-8 py-1 text-sm hover:bg-fuchsia-800 spotlight-gradient text-neutral-200 font-serif rounded-full uppercase transition-all"
										: "inline-flex px-8 py-1 text-sm hover:bg-fuchsia-800 bg-fuchsia-600 text-neutral-200 font-serif rounded-full uppercase transition-all"
								}>
								<span className="my-auto tracking-widest">
									{isAuthenticated ? user?.attributes?.ethAddress.slice(0, 5) : "connect"}
								</span>
							</button>
						</div>
						<div className="flex w-[65%] justify-between bg-neutral-950 pb-5">
							{navigation.map((item, i) => (
								<Link onClick={() => setIsOpen(false)} to={item.href} key={item.href + i}>
									{pathname === item.href ? (
										<span className="hover:text-white text-center tracking-widest uppercase text-amber-500 py-1 inline-flex justify-center text-sm">
											{item.name}
										</span>
									) : (
										<span className="hover:text-amber-500 text-center tracking-widest  text-neutral-400 uppercase inline-flex justify-center py-1 text-sm">
											{item.name}
										</span>
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
