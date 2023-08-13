import React from "react";
import {Button} from "@nextui-org/button";
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from "@nextui-org/modal";
import {UseDisclosureReturn} from "@nextui-org/use-disclosure";
import {Link} from "@nextui-org/link";
import {Divider} from "@nextui-org/divider";
import {Image} from "@nextui-org/image";
import {Spacer} from "@nextui-org/spacer";
import {Accordion, AccordionItem} from "@nextui-org/accordion";
import {GithubIcon, HeartIcon} from "@/components/icons";
import {Chip} from "@nextui-org/chip";
import {Tooltip} from "@nextui-org/tooltip";
import RetroRedSDK from "@/app/sdk";
import {useAccount} from "wagmi";
import {toast, ToastContainer} from "react-toastify";
import fa from "@walletconnect/legacy-modal/dist/cjs/browser/languages/fa";

export interface ProjectsDetails {
    id: number;
    name?: string;
    easAttestation: string;
    githubRepos?: string[];
    defiLlamaId?: string;
    addresses?: string[];
    totalTransactions?: number;
    gasUsed?: number;
    tvl?: number;
    githubStars?: number;
    githubActivity?: number;
    upvotes: number;
}

export interface ProjectDetailsModalProps {
    visibilityProps: UseDisclosureReturn;
    details: ProjectsDetails;
}

export const ProjectDetailsModal = (props: ProjectDetailsModalProps) => {
    const [sdk, setSDK] = React.useState(new RetroRedSDK());
    const [projectScore, setProjectScore] = React.useState(0);
    const { address, isConnected } = useAccount();

    React.useEffect(() => {
        if (props.details) {
            (async () => {
                const score = await sdk.getProjectScore(props.details.easAttestation);
                setProjectScore(score);
            })();
        }
    }, [props, sdk]);

    const onLike = async () => {
        if (address) {
            const score = await sdk.getScore(address);
            console.log(score);

            const hasAlreadyVoted = await sdk.hasAlreadyVoted(address, props.details.id);
            console.log(hasAlreadyVoted);

            if (hasAlreadyVoted === false) {
                if (score > 20) {
                    await sdk.upvote(props.details.id, props.details.easAttestation);
                    await sdk.confirmUpvote(props.details.id);
                } else {
                    console.warn("Gitcoin Passport score is too low");
                }
            }
        }
    };

    return (
        <div>
            <Modal
                backdrop={"blur"}
                isOpen={props.visibilityProps.isOpen}
                onClose={props.visibilityProps.onClose}
                scrollBehavior={'inside'}
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{props.details.name}</ModalHeader>
                            <Divider />
                            <ModalBody>
                                <p className={"text-center font-bold text-2xl m-3"}>✨ Score: {projectScore}</p>
                                <div className={"flex justify-center items-center mb-3"}>
                                    <Image
                                        className={"border-2 p-1 rounded-full border-blue-500"}
                                        src={"https://github.com/ethereum-attestation-service/eas-docs-site/blob/main/static/img/eas-logo.png?raw=true"}
                                        width={"32px"}
                                    />
                                    <Spacer x={2} />
                                    <Link
                                        className={"font-bold text-medium"}
                                        isExternal
                                        showAnchorIcon
                                        href={`https://optimism-goerli-bedrock.easscan.org/attestation/view/${props.details.easAttestation}`}
                                    >
                                        View on-chain score attestation.
                                    </Link>
                                </div>
                                <Divider />
                                <p className={"text-center font-bold text-2xl m-3"}>🔍 Details</p>
                                <div className={"flex justify-center items-center mb-3"}>
                                    <GithubIcon size={32} />
                                    <Spacer x={2} />
                                    <Link
                                        className={"font-bold text-medium"}
                                        isExternal
                                        showAnchorIcon
                                        href={`https://github.com/${props.details.githubRepos![0]}`}
                                        isDisabled={props.details.githubRepos === undefined}
                                    >
                                        Visit source code on GitHub.
                                    </Link>
                                </div>
                                <Accordion variant="light" selectionMode={"multiple"} disabledKeys={(() => {
                                    let disabledKeys: string[] = [];

                                    if (!props.details.githubRepos) {
                                        disabledKeys.push("1");
                                    }
                                    if (!props.details.addresses) {
                                        disabledKeys.push("2");
                                    }

                                    return disabledKeys;
                                })()}>
                                    <AccordionItem key="1" aria-label="GitHub Statistics" title="GitHub Statistics">
                                        <div className={"flex items-center mb-5"}>
                                            <Tooltip color={"primary"} content={
                                                <div className="px-1 py-2">
                                                    <div className="text-small font-bold">GitHub Stars</div>
                                                    <div className="text-tiny">The number of stars on the project&apos;s GitHub repository</div>
                                                </div>
                                            }>
                                                <Chip size={"lg"} color={"primary"} variant={"shadow"}>{props.details.githubStars} ⭐️</Chip>
                                            </Tooltip>
                                            <Spacer x={2} />
                                            <Tooltip color={"primary"} content={
                                                <div className="px-1 py-2">
                                                    <div className="text-small font-bold">GitHub Contributions</div>
                                                    <div className="text-tiny">The number of commits made during the last 15 days</div>
                                                </div>
                                            }>
                                                <Chip size={"lg"} color={"primary"} variant={"shadow"}>{props.details.githubActivity} 🐙</Chip>
                                            </Tooltip>
                                    </div>
                                    </AccordionItem>
                                    <AccordionItem key="2" aria-label="On-Chain Statistics" title="On-Chain Statistics">
                                        <div className={"flex items-center mb-5"}>
                                            <Tooltip color={"primary"} content={
                                                <div className="px-1 py-2">
                                                    <div className="text-small font-bold">Transaction Count</div>
                                                    <div className="text-tiny">The total number of transactions made to this contract</div>
                                                </div>
                                            }>
                                                <Chip size={"lg"} color={"primary"} variant={"shadow"}>{props.details.totalTransactions} 🧾</Chip>
                                            </Tooltip>
                                            <Spacer x={2} />
                                            <Tooltip color={"primary"} content={
                                                <div className="px-1 py-2">
                                                    <div className="text-small font-bold">Total Gas Used</div>
                                                    <div className="text-tiny">The total amount of gas consumed by this contract</div>
                                                </div>
                                            }>
                                                <Chip size={"lg"} color={"primary"} variant={"shadow"}>
                                                    {
                                                        props.details.gasUsed < 1000 ? props.details.gasUsed :
                                                        `${Math.round(props.details.gasUsed / 1000)}k`
                                                    } ⛽️
                                                </Chip>
                                            </Tooltip>
                                            {props.details.tvl &&
                                                <>
                                                    <Spacer x={2} />
                                                    <Tooltip color={"primary"} content={
                                                        <div className="px-1 py-2">
                                                            <div className="text-small font-bold">Total Value Locked</div>
                                                            <div className="text-tiny">The total value locked by this protocol according to DeFi Llama</div>
                                                        </div>
                                                    }>
                                                        <Chip size={"lg"} color={"primary"} variant={"shadow"}>{props.details.tvl} 💵</Chip>
                                                    </Tooltip>
                                                </>
                                            }
                                        </div>
                                    </AccordionItem>
                                </Accordion>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onClick={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={onLike} startContent={<HeartIcon />}>
                                    {props.details.upvotes}
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
}