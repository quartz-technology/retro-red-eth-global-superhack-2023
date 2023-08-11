import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { setTimeout } from 'timers/promises';

@Injectable()
export class GithubService {
  async getStars(id: string): Promise<number> {
    const res = await axios.get(`https://api.github.com/repos/${id}`);
    return res.data.stargazers_count;
  }

  async getActivity(id: string): Promise<number> {
    const res = await axios.get(
      `https://api.github.com/repos/${id}/stats/participation`,
    );

    if (res.status == 202) {
      await setTimeout(1000);
      return await this.getActivity(id);
    } else {
      return res.data.all[res.data.all.length - 1];
    }
  }
}
