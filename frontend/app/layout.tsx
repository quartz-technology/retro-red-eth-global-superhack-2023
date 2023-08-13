"use client"

import "@/styles/globals.css";
import { fontSans } from "@/config/fonts";
import { Providers } from "./providers";
import { Navbar } from "@/components/navbar";
import clsx from "clsx";
import React from "react";
import {createConfig, mainnet, WagmiConfig} from "wagmi";
import {createPublicClient, http} from "viem";
import {RetroRedContext} from "@/app/context";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const config = createConfig({
		autoConnect: true,
		publicClient: createPublicClient({
			chain: mainnet,
			transport: http()
		}),
	})
	const [isConnectedToWorldID, setIsConnectedToWorldID] = React.useState<boolean>(false);

	return (
		<html lang="en" suppressHydrationWarning>
			<head />
			<body
				className={clsx(
					"min-h-screen bg-background font-sans antialiased",
					fontSans.variable
				)}
			>
				<Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
					<RetroRedContext.Provider value={{ worldID: { value: isConnectedToWorldID, setValue: setIsConnectedToWorldID } }}>
					<WagmiConfig config={config}>
						<div className="relative flex flex-col h-screen">
							<Navbar />
							<main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
								{children}
							</main>
						</div>
					</WagmiConfig>
					</RetroRedContext.Provider>
				</Providers>
			</body>
		</html>
	);
}
