import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { useMoralis } from "react-moralis";
import { useLocation, useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { Dispatch } from "../../store";
import { Modals } from "../../models/globalModel";
import NavDropdown from "./NavDropdown/NavDropdown/NavDropdown";
import HedDot from "../../../../public/heddot.png";
import MobileDrawer from "./MobileDrawer/MobileDrawer";
import DarkModeToggle from "../../common/toggles/DarkModeToggle/DarkModeToggle";

const Navbar = () => {
	const dispatch = useDispatch<Dispatch>();
	const [isOpen, setIsOpen] = React.useState(false);
	const { isAuthenticated, user } = useMoralis();
	const { pathname } = useLocation<{ pathname: string }>();
	const history = useHistory();

	useEffect(() => {
		if (user) dispatch.userModel.getUserData(user?.attributes?.ethAddress);
	}, [isAuthenticated]);

	const navigation = [
		{ name: "home", href: "/" },
		{ name: "explore", href: "/explore" },
		{ name: "about", href: "/about" },
	];
	return (
		<Fragment>
			<div className={`${pathname === "/" && "absolute"} md:hidden z-50 w-screen mb-10`}>
				<div className="absolute left-5 top-5 -mt-1 md:left-6 md:top-6 z-50">
					<Link to="/">
						<img className="w-7 hover:contrast-50 transition-all ml-2 invert dark:invert-0" src={HedDot} />
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
				<div className="flex justify-between items-center gap-x-4 text-neutral-200 transition-all text-sm md:text-lg tracking-widest px-8 py-2.5">
					<Link to="/">
						<div className="inline-flex items-end -ml-2 mt-1">
							<img className={pathname === '/' ?
								"w-10 object-cover transition-all hover:contrast-50 mr-3 mt-1.5 dark:invert-0 invert" :
								"w-10 object-cover transition-all hover:contrast-50 mr-3 mt-1.5 invert dark:invert-0"
							} src={HedDot} />
						</div>
					</Link>
					<ul
						className={`static w-screen py-1 text-left`}>
						<div className={"inline-flex items-center justify-start navbar-parent dark:text-neutral-200 text-neutral-975 font-semibold"}>
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
						</div>
					</ul>
					<div className="flex items-center gap-x-2.5">
						<DarkModeToggle />
						<button
							key={pathname + "connect"}
							onClick={
								isAuthenticated
									? () => history.push("/profile")
									: () => dispatch.globalModel.setModal({ modal: Modals.CONNECT, open: true, locked: false })
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
						{isAuthenticated && <NavDropdown />}
						{/* <i className="fa-solid fa-circle dark:text-neutral-300 text-neutral-900"></i> */}
					</div>
				</div>
			</div>
			<MobileDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
		</Fragment>
	);
};

export default Navbar;
