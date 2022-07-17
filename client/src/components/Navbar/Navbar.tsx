import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useMoralis } from "react-moralis";
import { useLocation, useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { Dispatch } from "../../store";
import { Modals } from "../../models/globalModel";
import NavDropdown from "./NavDropdown/NavDropdown/NavDropdown";
import HedDot from "../../../../public/heddot.png";
import MobileDrawer from "./MobileDrawer/MobileDrawer";
// import DarkModeToggle from "../../common/toggles/DarkModeToggle/DarkModeToggle";

const Navbar = () => {
	const dispatch = useDispatch<Dispatch>();
	const [isOpen, setIsOpen] = React.useState(false);
	const { isAuthenticated, user } = useMoralis();
	const { pathname } = useLocation<{ pathname: string }>();
	const history = useHistory();
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
							onClick={
								isAuthenticated
									? () => history.push("/profile")
									: () => dispatch.globalModel.setModal({ modal: Modals.CONNECT, open: true, locked: false })
							}
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
			<MobileDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
		</Fragment>
	);
};

export default Navbar;
