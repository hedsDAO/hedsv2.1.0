import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { CogIcon } from "@heroicons/react/solid";

function classNames(...classes: any) {
	return classes.filter(Boolean).join(" ");
}

const NavDropdown = () => {
	return (
		<Menu as="div" className="relative inline-block text-left">
			<div>
				<Menu.Button className="inline-flex items-center justify-center px-3.5 py-1.5 ml-2 hover:bg-neutral-800 bg-neutral-700 text-neutral-200 font-serif rounded-full uppercase transition-all">
					<CogIcon className="h-4 w-4" />
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
				<Menu.Items className="origin-top-right absolute right-0 mt-3 w-40 rounded-sm shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
					<div className="py-1">
						<Menu.Item>
							{({ active }) => (
								<a
									href="#"
									className={classNames(
										active ? "bg-gray-100 text-gray-900" : "text-gray-700",
										"block px-4 py-2 text-sm"
									)}>
									settings
								</a>
							)}
						</Menu.Item>
						<Menu.Item>
							{({ active }) => (
								<a
									href="#"
									className={classNames(
										active ? "bg-gray-100 text-gray-900" : "text-gray-700",
										"block px-4 py-2 text-sm"
									)}>
									verify
								</a>
							)}
						</Menu.Item>
                        <Menu.Item>
							{({ active }) => (
								<a
									href="#"
									className={classNames(
										active ? "bg-gray-100 text-gray-900" : "text-gray-700",
										"block px-4 py-2 text-sm"
									)}>
									logout
								</a>
							)}
						</Menu.Item>
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	);
};

export default NavDropdown;
