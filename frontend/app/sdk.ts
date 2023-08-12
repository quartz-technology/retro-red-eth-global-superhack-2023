import axios, {AxiosInstance} from "axios";
import {ProjectsDetails} from "@/components/projectDetailsModal";

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
}

export default RetroRedSDK;