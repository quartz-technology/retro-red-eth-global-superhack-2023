import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DefiLlamaService } from 'src/defillama/defillama.service';
import { GithubService } from 'src/github/github.service';
import { ProjectService } from 'src/project/project.service';
import { TransactionService } from 'src/transaction/transaction.service';

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
      console.log('Fetcher finished');
    }
  }
}
