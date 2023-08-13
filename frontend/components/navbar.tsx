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
import {optimismGoerli} from "@wagmi/chains";
import {LogoutIcon} from "@/components/icons";
import RetroRedSDK from "@/app/sdk";
import {IDKitWidget} from "@worldcoin/idkit";
import {IRetroRedContext, RetroRedContext} from "@/app/context";

export const Navbar = () => {
	const { address, isConnected } = useAccount();
	const { connect } = useConnect({
		connector: new MetaMaskConnector({
			chains: [
				optimismGoerli
			]
		}),
	});
	const { disconnect } = useDisconnect();
	const { data: ensName } = useEnsName({ address });
	const sdk = new RetroRedSDK();
	const { worldID } = React.useContext<IRetroRedContext>(RetroRedContext);

	return (
		<NextUINavbar maxWidth="xl" position="sticky" isBordered={true} isBlurred={true}>
			<NavbarBrand>
				<p className="font-bold text-2xl">Retro</p>
				<p className="font-bold text-2xl text-red-500">Red</p>
			</NavbarBrand>
			<NavbarContent justify={"end"}>
				<NavbarItem>
					<IDKitWidget
						app_id="app_3234db51d4dd4d3cb79d27bc8ee1109d" // obtained from the Developer Portal
						action="proof-of-human" // this is your action name from the Developer Portal
						handleVerify={() => {
							worldID.setValue(true);
						}} // optional callback when the proof is
						// received
						credential_types={['orb', 'phone']} // optional, defaults to ['orb']
						enableTelemetry={false} // optional, defaults to false
					>
						{({ open }) => <button onClick={open}>Link World ID</button>}
					</IDKitWidget>
				</NavbarItem>
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
										description={"Link your Gitcoin passport"}
										onClick={async () => {
											if (address) {
												await sdk.submitPassport(address);
											}
										}}
									>
										Link Gitcoin
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
							connect();
						}}>
							Connect Wallet
						</Button>
					}
				</NavbarItem>
			</NavbarContent>
		</NextUINavbar>
	);
};
