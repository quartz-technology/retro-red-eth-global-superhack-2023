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
import {Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from "@nextui-org/dropdown";
import {Divider} from "@nextui-org/divider";
import {Link} from "@nextui-org/link";
import RetroRedSDK from "@/app/sdk";

export default function Home() {
	const [selectedKeys, setSelectedKeys] = React.useState(new Set(["score"]));
	const selectedValue = React.useMemo(
		() => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
		[selectedKeys]
	);
	const disclosure = useDisclosure();

	const [projects, setProjects] = React.useState<ProjectsDetails[]>([]);
	const [selectedProject, setSelectedProject] = React.useState(0);

	React.useEffect(() => {
		(async () => {
			const sdk = new RetroRedSDK();

			setProjects(await sdk.getProjects() ?? []);
		})();
	}, []);

	return (
		<div>
			<div className={"flex flex-row items-center justify-between"}>
				<div className={"flex flex-row items-center"}>
					<p className={"font-bold"}>Sort by</p>
					<Spacer x={2} />
					<Dropdown>
						<DropdownTrigger>
							<Button
								variant="bordered"
								className="capitalize"
							>
								{selectedValue}
							</Button>
						</DropdownTrigger>
						<DropdownMenu
							aria-label="Single selection actions"
							variant="flat"
							disallowEmptySelection
							selectionMode="single"
							selectedKeys={selectedKeys}
							onSelectionChange={(keys) => {
								setSelectedKeys(keys as Set<string>);
							}}
						>
							<DropdownItem key="score">Score</DropdownItem>
							<DropdownItem key="upvotes">Upvotes</DropdownItem>
							<DropdownItem key="random">Random</DropdownItem>
						</DropdownMenu>
					</Dropdown>
				</div>
				<Button color={"primary"} variant={"bordered"}>
					Download Bulk Data
				</Button>
			</div>
			<Spacer y={2} />
			<Divider />
			<Spacer y={2} />
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
									<Button className="text-sm text-white bg-black/20" variant="flat" color="default" radius="lg" size="sm" onClick={() => {
										disclosure.onOpen();
										setSelectedProject(id);
									}}>
										Discover More
									</Button>
								</CardFooter>
							</Card>
					)
				})}
				<ProjectDetailsModal
					visibilityProps={disclosure}
					details={projects[selectedProject]}
				/>
			</div>
		</div>
	);
}
