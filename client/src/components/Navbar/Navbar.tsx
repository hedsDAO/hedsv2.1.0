import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMoralis } from "react-moralis";
import ConnectModal from "../../common/modals/ConnectModal/ConnectModal";
import { useLocation, useHistory } from "react-router";
import logoImg from "../../../../public/hedslogo.png";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import profileTestImg from "../../../../public/2.png";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";

const Navbar = () => {
	const [isShowingConnectModal, setIsShowingConnectModal] = useState(false);
	const [isOpen, setIsOpen] = React.useState(false);
	const toggleDrawer = () => {
		setIsOpen((prevState) => !prevState);
	};
	const { isAuthenticated, user, logout } = useMoralis();
	const { pathname } = useLocation<{ pathname: string }>();
	const history = useHistory();
	const navigation = [
		{ name: "home", href: "/" },
		{ name: "tapes", href: "/tapes" },
		{ name: "about", href: "/about" },
	];
	return (
		<>
			<ConnectModal isShowingConnectModal={isShowingConnectModal} setIsShowingConnectModal={setIsShowingConnectModal} />
			<div className={`${pathname === "/" && "absolute"} md:hidden z-40 w-screen`}>
				{/* MOBILE DROPDOWN AND ICONS */}
				<div className="absolute left-5 top-5 -mb-0.25 md:left-6 md:top-6 z-40">
					<Link to="/">
						<img className="w-16 md:hidden hover:contrast-50 transition-all" src={logoImg} />
					</Link>
				</div>
				<button
					onClick={() => setIsOpen(true)}
					className="rounded-md bg-transparent text-gray-400 focus:outline-none border-transparent active:bg-transparent">
					<MenuIcon className="md:hidden absolute top-4 right-6 h-7 w-7 z-40 mt-1" aria-hidden="true" />
				</button>
			</div>
			{/* DESKTOP NAV */}
			<div className={`${pathname === "/" && "absolute"} md:inline hidden right-0 z-50 w-screen`}>
				<ul className="flex justify-between items-center gap-x-8 text-neutral-200 transition-all text-sm md:text-lg tracking-widest px-5 py-3">
					<Link to="/">
						<li className="">
							<img className="w-16 md:w-20 hover:contrast-50 transition-all -mt-0.5 p-2" src={logoImg} />
						</li>
					</Link>
					<div className="flex items-center justify-center bg-neutral-900 py-1 xl:ml-[1.9%] lg:ml-[2.8%] md:ml-[3.9%] px-1">
						{navigation.map((item, i) => (
							<div key={item.href + i}>
								{pathname === item.href ? (
									<Link to={item.href}>
										<li className="hover:text-white select-none uppercase text-amber-500 bg-black px-5 py-1 text-sm">
											{item.name}
										</li>
									</Link>
								) : (
									<Link to={item.href}>
										<li className="hover:text-amber-500 select-none uppercase px-5 py-1 text-sm">
											{item.name}
										</li>
									</Link>
								)}
							</div>
						))}
					</div>
					<div className="flex items-center">
						<button
							onClick={isAuthenticated ? () => history.push("/profile") : () => setIsShowingConnectModal(true)}
							className="inline-flex items-center my-auto px-10 py-1 text-sm hover:bg-fuchsia-800 bg-fuchsia-600 text-neutral-200 font-serif rounded-full uppercase transition-all">
							<span className="my-auto tracking-widest">
								{isAuthenticated ? user?.attributes?.ethAddress.slice(0, 5) : "connect"}
							</span>
						</button>
						{isAuthenticated && (
							<button
								onClick={() => logout()}
								className="inline-flex items-center justify-center px-3.5 py-1.5 ml-2 hover:bg-neutral-800 bg-neutral-700 text-neutral-200 font-serif rounded-full uppercase transition-all">
								<i className="fa-regular fa-arrow-up-left-from-circle text-xs -ml-0.25 my-0.25"></i>
							</button>
						)}
					</div>
				</ul>
			</div>
			<Drawer open={isOpen} onClose={toggleDrawer} direction="top" className="">
				<div className="relative z-40 inline-block bg-neutral-900 py-3 px-3 text-left overflow-hidden shadow-xl transition-all w-full h-full">
					<div role="button" onClick={() => setIsOpen(false)}>
						<XIcon className="md:hidden text-gray-400 absolute top-4 right-6 h-7 w-7 z-50 mt-1" aria-hidden="true" />
					</div>
					<div className="flex flex-col justify-evenly items-center bg-neutral-950 -p-1 h-full">
						<div className="lg:mx-auto lg:max-w-7xl lg:px-6 lg:grid lg:grid-cols-2 gap-x-4">
							<div className="flex flex-col items-center justify-center">
								<img
									onClick={() => setIsOpen(false)}
									className="object-fill w-[5rem] h-[5rem] bg-neutral-900 border-fuchsia-900 border-2 p-1 rounded-full lg:ml-auto"
									src={profileTestImg}
								/>
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
											setIsShowingConnectModal(true);
										}
								}
								className="inline-flex px-10 py-1 text-sm hover:bg-fuchsia-800 bg-fuchsia-600 text-neutral-200 font-serif rounded-full uppercase transition-all">
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
											<span className="hover:text-white select-none uppercase text-amber-500 bg-black px-5 py-1 text-sm">
												{item.name}
											</span>
										</Link>
									) : (
										<Link onClick={() => setIsOpen(false)} to={item.href}>
											<span className="hover:text-amber-500 text-neutral-400 select-none uppercase px-5 py-1 text-sm">
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
		</>
	);
};

export default Navbar;
