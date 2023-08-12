"use client";

import React from "react";
import {Button} from "@nextui-org/button";
import {
	ProjectDetailsModal,
	ProjectDetailsModalProps,
	ProjectsDetails
} from "@/components/projectDetailsModal";
import {useDisclosure} from "@nextui-org/modal";
import {Card, CardFooter, CardHeader} from "@nextui-org/card";
import {Image} from "@nextui-org/image";
import {IdentityIcon} from "@/components/icons";
import {Spacer} from "@nextui-org/spacer";

export default function Home() {
	const disclosure = useDisclosure();
	const projects: ProjectsDetails[] = [
		{
			easLink: "string",
			name: "ethers.js",
			githubRepositoryURL: "string",
			defiLlamaID: "string",
			contractAddresses: ["string"],
			totalTransactionsCount: 42,
			gasUsed: 42,
			tvl: 42,
			githubStars: 42,
			githubActivity: 42,
			upvotes: 42,
		},
		{
			easLink: "string",
			name: "uniswap",
			githubRepositoryURL: "string",
			defiLlamaID: "string",
			contractAddresses: ["string"],
			totalTransactionsCount: 42,
			gasUsed: 42,
			tvl: 42,
			githubStars: 42,
			githubActivity: 42,
			upvotes: 42,
		},
		{
			easLink: "string",
			name: "curve",
			githubRepositoryURL: "string",
			defiLlamaID: "string",
			contractAddresses: ["string"],
			totalTransactionsCount: 42,
			gasUsed: 42,
			tvl: 42,
			githubStars: 42,
			githubActivity: 42,
			upvotes: 42,
		},
		{
			easLink: "string",
			name: "arken.fi",
			githubRepositoryURL: "string",
			defiLlamaID: "string",
			contractAddresses: ["string"],
			totalTransactionsCount: 42,
			gasUsed: 42,
			tvl: 42,
			githubStars: 42,
			githubActivity: 42,
			upvotes: 42,
		},
	];

	return (
		<div>

			<div className={"grid grid-cols-12 grid-rows-2 gap-4"}>
				{projects.map((props, id) => {
					return (
							<Card
								key={id}
								isFooterBlurred={true}
								radius={"lg"}
								className={"col-span-12 sm:col-span-3 h-[300px]"}
							>
								<IdentityIcon className={"scale-125"} username={props.name ?? JSON.stringify(props)} />
								<CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
									<p className="text-medium font-bold text-white/80">{props.name}</p>
									<p className="text-medium font-bold text-white/80">{props.upvotes} ❤️</p>
									<Button className="text-sm text-white bg-black/20" variant="flat" color="default" radius="lg" size="sm" onClick={disclosure.onOpen}>
										Discover More
									</Button>
								</CardFooter>
							</Card>
					)
				})}
				<ProjectDetailsModal
					visibilityProps={disclosure}
					details={projects[0]}
				/>
			</div>
		</div>
	);
}
