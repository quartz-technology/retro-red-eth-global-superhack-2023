import {
	Navbar as NextUINavbar, NavbarBrand,
	NavbarContent, NavbarItem,
} from "@nextui-org/navbar";
import React from "react";
import {Button} from "@nextui-org/button";

export const Navbar = () => {
	return (
		<NextUINavbar maxWidth="xl" position="sticky" isBordered={true} isBlurred={true}>
			<NavbarBrand>
				<p className="font-bold text-2xl">Retro</p>
				<p className="font-bold text-2xl text-red-500">Red</p>
			</NavbarBrand>
			<NavbarContent justify={"end"}>
				<NavbarItem>
					<Button color={"primary"}>
						Connect Wallet
					</Button>
				</NavbarItem>
			</NavbarContent>
		</NextUINavbar>
	);
};
