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

      const contracts = await this.transactionService.getUniqueContracts();

      for (const contract of contracts) {
        console.log('Fetching on chain data', contract)
        const totalTransactions =
          await this.transactionService.countByContractAddress(contract);
        const gasUsed =
          await this.transactionService.sumGasUsedByContractAddress(contract);

        await this.projectService.create({
          addresses: [contract],
          totalTransactions,
          gasUsed: gasUsed.toString(),
        });
      }

      for (const project of data) {
        console.log('Fetching off chain data', project);
        const name = project.name;
        const githubRepos = project.githubRepos;
        const defiLLamaId = project.defiLLamaId;
        const addresses = project.addresses;

        const tvl =
          defiLLamaId !== undefined
            ? await this.defiLLamaService.getTvl(defiLLamaId)
            : undefined;
        let githubStars = githubRepos !== undefined ? 0 : undefined;
        let githubActivity = githubRepos !== undefined ? 0 : undefined;

        if (githubRepos !== undefined) {
          for (const githubRepo of githubRepos) {
            githubStars += await this.githubService.getStars(githubRepo);
            githubActivity += await this.githubService.getActivity(githubRepo);
          }
        }

        if (addresses !== undefined && addresses.length > 0) {
          const oldProject = await this.projectService.findOneByAddress(
            addresses[0],
          );

          if (oldProject !== undefined) {
            oldProject.name = name;
            oldProject.githubRepos = githubRepos;
            oldProject.defiLLamaId = defiLLamaId;
            oldProject.addresses = addresses;
            oldProject.tvl = tvl;
            oldProject.githubStars = githubStars;
            oldProject.githubActivity = githubActivity;

            for (let i = 1; i < addresses.length; ++i) {
              const otherProject = await this.projectService.findOneByAddress(
                addresses[i],
              );
              if (otherProject !== undefined) {
                oldProject.totalTransactions += otherProject.totalTransactions;
                oldProject.gasUsed = (
                  BigInt(oldProject.gasUsed) + BigInt(otherProject.gasUsed)
                ).toString();
              }
            }

            await this.projectService.update(oldProject.id, oldProject);

            for (let i = 1; i < addresses.length; ++i) {
              await this.projectService.deleteByAddress(addresses[i]);
            }
          } else {
            await this.projectService.create({
              name,
              githubRepos,
              defiLLamaId,
              addresses,
              tvl,
              githubStars,
              githubActivity,
            });
          }
        } else {
          await this.projectService.create({
            name,
            githubRepos,
            defiLLamaId,
            addresses,
            tvl,
            githubStars,
            githubActivity,
          });
        }
      }

      console.log('Fetcher finished');
    }
  }
}
