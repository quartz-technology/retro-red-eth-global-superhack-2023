import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class DefiLlamaService {
  async getTvl(id: string): Promise<number> {
    const res = await axios.get(`https://api.llama.fi/protocol/${id}`);
    return res.data.currentChainTvls.Optimism;
  }
}
