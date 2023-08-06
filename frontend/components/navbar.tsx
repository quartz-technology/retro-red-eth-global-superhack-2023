import {
	Navbar as NextUINavbar, NavbarBrand,
	NavbarContent, NavbarItem,
} from "@nextui-org/navbar";
import React from "react";
import {Button} from "@nextui-org/button";
import {useAccount, useConnect, useDisconnect, useEnsName} from "wagmi";
import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownSection,
	DropdownTrigger
} from "@nextui-org/dropdown";
import {MetaMaskConnector} from "@wagmi/connectors/metaMask";
import {optimism} from "@wagmi/chains";
import {GithubIcon, LogoutIcon} from "@/components/icons";

export const Navbar = () => {
	const { address, isConnected } = useAccount()
	const { connect } = useConnect({
		connector: new MetaMaskConnector({
			chains: [
				optimism
			]
		}),
	});
	const { disconnect } = useDisconnect();
	const { data: ensName } = useEnsName({ address });

	return (
		<NextUINavbar maxWidth="xl" position="sticky" isBordered={true} isBlurred={true}>
			<NavbarBrand>
				<p className="font-bold text-2xl">Retro</p>
				<p className="font-bold text-2xl text-red-500">Red</p>
			</NavbarBrand>
			<NavbarContent justify={"end"}>
				<NavbarItem>
					{isConnected ?
						<Dropdown backdrop="blur">
							<DropdownTrigger>
								<Button
									variant="shadow"
								>
									{ensName ? ensName : `${address?.substring(0, 5)}...${address?.substring(address?.length - 4, address?.length)}`}
								</Button>
							</DropdownTrigger>
							<DropdownMenu variant="shadow" aria-label="Static Actions">
								<DropdownSection title={"Actions"} showDivider>
									<DropdownItem
										description={"Link your GitHub account"}
										startContent={<GithubIcon />}
									>
										Link GitHub
									</DropdownItem>
								</DropdownSection>
								<DropdownSection title={"Profile"}>
									<DropdownItem
										className="text-danger"
										color="danger"
										description={"Log out from RetroRed"}
										onClick={() => disconnect() }
										startContent={<LogoutIcon />}
									>
										Disconnect
									</DropdownItem>
								</DropdownSection>
							</DropdownMenu>
						</Dropdown>
						:
						<Button color={"primary"} onClick={() => {
							connect()
						}}>
							Connect Wallet
						</Button>
					}
				</NavbarItem>
			</NavbarContent>
		</NextUINavbar>
	);
};