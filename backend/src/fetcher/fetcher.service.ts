import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DefiLlamaService } from 'src/defillama/defillama.service';
import { GithubService } from 'src/github/github.service';
import { ProjectService } from 'src/project/project.service';
import { TransactionService } from 'src/transaction/transaction.service';
import data from '../data/projects';

@Injectable()
export class FetcherService implements OnModuleInit {
  constructor(
    private readonly defiLLamaService: DefiLlamaService,
    private readonly githubService: GithubService,
    private readonly transactionService: TransactionService,
    private readonly projectService: ProjectService,
    private configService: ConfigService,
  ) {}

  async onModuleInit() {
    if (this.configService.get('fetcher.enabled')) {
      console.log('Fetcher started');

      for (const project of data) {
        console.log('Fetching', project);
        const { name, githubRepos, defiLLamaId, addresses } = project;

        const tvl =
          defiLLamaId !== undefined
            ? await this.defiLLamaService.getTvl(defiLLamaId)
            : undefined;
        let githubStars = githubRepos !== undefined ? 0 : undefined;
        let githubActivity = githubRepos !== undefined ? 0 : undefined;
        let totalTransactions = addresses !== undefined ? 0 : undefined;
        let gasUsed = addresses !== undefined ? 0n : undefined;

        if (githubRepos !== undefined) {
          for (const githubRepo of githubRepos) {
            githubStars += await this.githubService.getStars(githubRepo);
            githubActivity += await this.githubService.getActivity(githubRepo);
          }
        }

        if (addresses !== undefined && addresses.length > 0) {
          for (let i = 0; i < addresses.length; ++i) {
            totalTransactions +=
              await this.transactionService.countByContractAddress(
                addresses[i],
              );
            gasUsed +=
              await this.transactionService.sumGasUsedByContractAddress(
                addresses[i],
              );
          }
        }

        await this.projectService.create({
          name,
          githubRepos,
          defiLLamaId,
          addresses,
          totalTransactions,
          gasUsed: gasUsed !== undefined ? gasUsed.toString() : undefined,
          tvl,
          githubStars,
          githubActivity,
        });
      }

      console.log('Fetcher finished');
    }
  }
}
