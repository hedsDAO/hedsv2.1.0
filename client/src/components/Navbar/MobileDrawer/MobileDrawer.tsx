import React from "react";
import Drawer from "react-modern-drawer";
import { XIcon } from "@heroicons/react/solid";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Dispatch } from "../../../store";
import { useMoralis } from "react-moralis";
import profileTestImg from "../../../../../public/2.png";
import { Modals } from "../../../models/globalModel";
import "react-modern-drawer/dist/index.css";

const MobileDrawer = ({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: Function }) => {
	const { pathname } = useParams<{ pathname: string }>();
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
			<div className="relative z-40 inline-block bg-neutral-900 py-3 px-3 text-left overflow-hidden shadow-xl transition-all w-full h-full">
				<div role="button" onClick={() => setIsOpen(false)}>
					<XIcon className="md:hidden text-gray-400 absolute top-4 right-6 h-7 w-7 z-50 mt-1" aria-hidden="true" />
				</div>
				<div className="flex flex-col justify-evenly items-center bg-neutral-950 -p-1 h-full">
					<div className="lg:mx-auto lg:max-w-7xl lg:px-6 lg:grid lg:grid-cols-2 gap-x-4">
						<div className="flex flex-col items-center justify-center">
							<Link to="/profile">
								<img
									onClick={() => setIsOpen(false)}
									className="object-fill w-[5rem] h-[5rem] bg-neutral-900 border-fuchsia-900 border-2 p-1 rounded-full lg:ml-auto"
									src={profileTestImg}
								/>
							</Link>
						</div>
					</div>
					<div className="flex justify-center">
						{isAuthenticated && (
							<button
								onClick={() => logout()}
								className="inline-flex items-center justify-center px-3 mr-2 text-sm hover:bg-gray-900 bg-gray-800 text-neutral-200 font-serif rounded-full uppercase transition-all">
								<i className="fa-regular fa-arrow-up-left-from-circle my-auto -ml-0.25"></i>
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
									? "inline-flex px-10 py-1 text-sm hover:bg-fuchsia-800 spotlight-gradient text-neutral-200 font-serif rounded-full uppercase transition-all"
									: "inline-flex px-10 py-1 text-sm hover:bg-fuchsia-800 bg-fuchsia-600 text-neutral-200 font-serif rounded-full uppercase transition-all"
							}>
							<span className="my-auto tracking-widest">
								{isAuthenticated ? user?.attributes?.ethAddress.slice(0, 5) : "connect"}
							</span>
						</button>
					</div>
					<div className="flex items-center justify-center">
						{navigation.map((item, i) => (
							<div key={item.href + i}>
								{pathname === item.href ? (
									<Link onClick={() => setIsOpen(false)} to={item.href}>
										<span className="hover:text-white tracking-widest  select-none uppercase text-amber-500 bg-black px-5 py-1 text-sm">
											{item.name}
										</span>
									</Link>
								) : (
									<Link onClick={() => setIsOpen(false)} to={item.href}>
										<span className="hover:text-amber-500 tracking-widest  text-neutral-400 select-none uppercase px-5 py-1 text-sm">
											{item.name}
										</span>
									</Link>
								)}
							</div>
						))}
					</div>
				</div>
			</div>
		</Drawer>
	);
};

export default MobileDrawer;
