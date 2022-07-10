import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { useMoralis } from "react-moralis";
import ConnectModal from "../../common/modal/ConnectModal/ConnectModal";
import { useLocation, useHistory } from "react-router";
import { XIcon } from "@heroicons/react/outline";
import NavDropdown from "../../common/dropdown/NavDropdown/NavDropdown";
import profileTestImg from "../../../../public/2.png";
import HedDot from "../../../../public/heddot.png";
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
		{ name: "explore", href: "/explore" },
		{ name: "about", href: "/about" },
	];
	return (
		<Fragment>
			<ConnectModal isShowingConnectModal={isShowingConnectModal} setIsShowingConnectModal={setIsShowingConnectModal} />
			<div className={`${pathname === "/" && "absolute"} md:hidden z-50 w-screen mb-10`}>
				<div className="absolute left-5 top-5 -mt-1 md:left-6 md:top-6 z-50">
					<Link to="/">
						<img className="w-7 hover:contrast-50 transition-all ml-2" src={HedDot} />
					</Link>
				</div>
				<button
					onClick={() => setIsOpen(true)}
					className="rounded-md bg-transparent text-gray-400 focus:outline-none border-transparent active:bg-transparent">
					<i
						className="fa-duotone fa-bars-staggered md:hidden absolute top-5 right-7 z-40 text-xl text-fuchsia-500"
						aria-hidden="true"
					/>
				</button>
			</div>
			<div className={`${pathname === "/" && "absolute"} md:inline hidden right-0 z-50 w-screen transition-all ease-in-out`}>
				<div className="flex justify-between items-center gap-x-4 text-neutral-200 transition-all text-sm md:text-lg tracking-widest px-8 py-5">
					<Link to="/">
						<div className="inline-flex items-end -ml-2 mt-1">
							<img className="w-10 object-cover transition-all hover:contrast-50 mr-3" src={HedDot} />
						</div>
					</Link>
					<ul
						className={`flex items-center justify-center navbar-parent py-1 px-1 ${
							isAuthenticated ? "xl:-mr-[5.6%] lg:-mr-[6.6%] md:-mr-[7.6%]" : "xl:-mr-[4.3%] lg:-mr-[5.3%] md:-mr-[6.3%]"
						}`}>
						{navigation.map((item, i) => (
							<div key={item.href + i}>
								{pathname === item.href ? (
									<li className="current" data-hover={item.name}>
										<Link to={item.href}>{item.name}</Link>
									</li>
								) : (
									<li className="" data-hover={item.name}>
										<Link to={item.href}>{item.name}</Link>
									</li>
								)}
							</div>
						))}
					</ul>
					<div className="flex items-center">
						<button
							key={pathname + "connect"}
							onClick={isAuthenticated ? () => history.push("/profile") : () => setIsShowingConnectModal(true)}
							className={
								pathname === "/profile"
									? "inline-flex px-10 py-1 text-sm hover:bg-fuchsia-800 spotlight-gradient  text-neutral-200 font-serif rounded-full uppercase transition-all"
									: "inline-flex px-10 py-1 text-sm hover:bg-fuchsia-800 bg-fuchsia-600 text-neutral-200 font-serif rounded-full uppercase transition-all"
							}>
							<span className="my-auto tracking-widest">
								{isAuthenticated ? user?.attributes?.ethAddress.slice(0, 5) : "connect"}
							</span>
						</button>
						{isAuthenticated && <NavDropdown />}
					</div>
				</div>
			</div>
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
												setIsShowingConnectModal(true);
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
		</Fragment>
	);
};

export default Navbar;
