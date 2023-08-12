import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { setTimeout } from 'timers/promises';

@Injectable()
export class GithubService {
  constructor(private readonly configService: ConfigService) {}

  async getStars(id: string): Promise<number> {
    const res = await axios.get(`https://api.github.com/repos/${id}`, {
      headers: {
        Authorization: `Bearer ${this.configService.get(
          'fetcher.githubToken',
        )}`,
      },
    });
    return res.data.stargazers_count;
  }

  async getActivity(id: string): Promise<number> {
    const res = await axios.get(
      `https://api.github.com/repos/${id}/stats/participation`,
      {
        headers: {
          Authorization: `Bearer ${this.configService.get(
            'fetcher.githubToken',
          )}`,
        },
      },
    );

    if (res.status == 202) {
      await setTimeout(1000);
      return await this.getActivity(id);
    } else {
      return res.data.all[res.data.all.length - 1];
    }
  }
}
