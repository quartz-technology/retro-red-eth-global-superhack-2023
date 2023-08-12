import axios, {AxiosInstance} from "axios";
import {ProjectsDetails} from "@/components/projectDetailsModal";
import {ethers} from "ethers";
import {EAS} from "@ethereum-attestation-service/eas-sdk";

declare global {
    interface Window {
        ethereum?: any
    }
}

interface SigningMessageRO {
    message: string;
    nonce: number;
}

class RetroRedSDK {
    /**
     * Axios client
     * @private
     */
    private client: AxiosInstance;

    /**
     * API base URL
     * @private
     */
    private readonly baseURL = "http://51.158.119.230:3000";

    private readonly gitCoinHeaders = {
        'Content-Type': 'application/json',
        'X-API-Key': "hovEx0Yj.2N10z2AjUCr6OODFlUWoqeuEDTjfQfz4"
    };

    /**
     * Create a new client
     */
    constructor() {
        this.client = axios.create({
            baseURL: this.baseURL,
            timeout: 6000,
            withCredentials: true,
        });
    }

    async getProjects(): Promise<ProjectsDetails[] | null> {
        try {
            const res = await this.client.get<ProjectsDetails[]>("/project");

            return res.data;
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    async getSigningMessage() {
        const SIGNING_MESSAGE_URI = 'https://api.scorer.gitcoin.co/registry/signing-message';

        // fetch the message to sign from the server
        const response = await fetch(SIGNING_MESSAGE_URI, {
            headers: this.gitCoinHeaders,
        })

        return await response.json() as SigningMessageRO;
    }

    async submitPassport(address: string) {
        const SUBMIT_PASSPORT_URI = 'https://api.scorer.gitcoin.co/registry/submit-passport';

        try {
            // GET request to the Passport API to get the signing message and the nonce
            const { message, nonce } = await this.getSigningMessage();
            // instantiate a new provider instance
            const provider = new ethers.BrowserProvider(window.ethereum);
            // call the provider's `getSigner` API method to start the signing process
            const signer = await provider.getSigner();
            // ask the user to sign the message
            const signature = await signer.signMessage(message);
            // POST request to the Passport API, sending the signing message, the signature, and the nonce
            const response = await fetch(SUBMIT_PASSPORT_URI, {
                method: 'POST',
                headers: this.gitCoinHeaders,
                body: JSON.stringify({
                    address,
                    scorer_id: "4962",
                    signature,
                    nonce
                })
            })

            // assign the response data to `data` as a json object
            const data = await response.json()
            console.log('data:', data);
        } catch (err) {
            console.log('error: ', err)
            return null;
        }
    }

    async getScore(address: string) {
        const GET_PASSPORT_SCORE_URI = `https://api.scorer.gitcoin.co/registry/score/${4962}/${address}`

        try {
            const response = await fetch(GET_PASSPORT_SCORE_URI, {
                headers: this.gitCoinHeaders,
            });
            const passportData = await response.json();

            if (passportData.score) {
                // if the user has a score, round it and set it in the local state
                const roundedScore = Math.round(passportData.score * 100) / 100
                console.log("PASSPORT SCORE = ", roundedScore)

                return roundedScore;
            } else {
                // if the user has no score, display a message letting them know to submit thier passporta
                console.log('No score available, please add Stamps to your passport and then resubmit.')

                return null;
            }
        } catch (err) {
            console.log('error: ', err)

            return null;
        }
    }

    async getProjectScore(attestationUID: string) {
        const EASContractAddress = '0x4200000000000000000000000000000000000021';
        const eas = new EAS(EASContractAddress);
        const provider = new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_DEFAULT_RPC_URL);
        eas.connect(provider);

        const attestation = await eas.getAttestation(attestationUID);
        return Number("0x" + attestation.data.slice(66, 66 + 64));
    }
}

export default RetroRedSDK;