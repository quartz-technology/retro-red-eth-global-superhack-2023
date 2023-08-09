import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BlockService } from 'src/block/block.service';
import { TransactionService } from 'src/transaction/transaction.service';
import axios from 'axios';
import axiosRetry from 'axios-retry';

@Injectable()
export class IndexerService implements OnModuleInit {
  constructor(
    private readonly blockService: BlockService,
    private readonly transactionService: TransactionService,
    private configService: ConfigService,
  ) {}

  async onModuleInit() {
    if (this.configService.get('indexer.enabled')) {
      console.log('Indexer started');

      const startBlock = this.configService.get('indexer.startBlock');
      const endBlock = this.configService.get('indexer.endBlock');
      const batchSize = this.configService.get('indexer.batchSize');

      const jsonRpcUrl = this.configService.get('indexer.jsonRpcUrl');

      const client = axios.create({ baseURL: jsonRpcUrl });
      axiosRetry(client, {
        retryDelay: axiosRetry.exponentialDelay,
        retryCondition: () => true,
      });

      for (let i = startBlock; i < endBlock; i += batchSize) {
        const batch = [];
        for (let j = 0; j < batchSize; j++) {
          const res = client.post('', {
            jsonrpc: '2.0',
            method: 'eth_getBlockByNumber',
            params: ['0x' + (i + j).toString(16), true],
            id: 1,
          });

          batch.push(res);
        }

        const res = await Promise.all(batch);

        for (const result of res) {
          const {
            hash: blockHash,
            number,
            timestamp,
            transactions,
          } = result.data.result;

          await this.blockService.create({
            hash: blockHash,
            number: parseInt(number, 16),
            timestamp: parseInt(timestamp, 16),
          });

          for (const transaction of transactions) {
            const { hash, from, to, gas, value } = transaction;

            if (!to) continue;

            await this.transactionService.create({
              hash,
              from,
              to,
              gasUsed: BigInt(gas).toString(),
              value: BigInt(value).toString(),
              blockHash,
            });
          }
          console.log(`Block ${number} indexed`);
        }
      }
    }
    console.log('Indexer stopped');
  }
}
