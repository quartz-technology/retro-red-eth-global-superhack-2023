import { Injectable } from '@nestjs/common';
import { EAS, SchemaEncoder } from '@ethereum-attestation-service/eas-sdk';
import { ethers } from 'ethers';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EasService {
  private eas: EAS;

  constructor(private readonly configService: ConfigService) {
    const EASContractAddress = '0x4200000000000000000000000000000000000021';

    this.eas = new EAS(EASContractAddress);

    const jsonRpcUrl = this.configService.get('attester.jsonRpcUrl');
    const provider = new ethers.JsonRpcProvider(jsonRpcUrl);
    const signer = new ethers.Wallet(
      this.configService.get('attester.privateKey'),
      provider,
    );

    this.eas.connect(signer);
  }

  async attestProject({
    id,
    score,
    tvl,
    githubStars,
    githubActivity,
    totalTransactions,
    gasUsed,
    onchainScore,
    defillamaScore,
    githubScore,
  }: {
    id: number;
    score: number;
    tvl: number;
    githubStars: number;
    githubActivity: number;
    totalTransactions: number;
    gasUsed: string;
    onchainScore: number;
    defillamaScore: number;
    githubScore: number;
  }): Promise<string> {
    const schemaEncoder = new SchemaEncoder(
      'uint128 id,uint128 score,uint128 tvl,uint128 githubStars,uint128 githubActivity,uint128 totalTransactions,uint256 gasUsed,uint128 onchainScore,uint128 defillamaScore,uint128 githubScore',
    );

    score = Math.floor(score);
    onchainScore = Math.floor(onchainScore ?? 0);
    defillamaScore = Math.floor(defillamaScore ?? 0);
    githubScore = Math.floor(githubScore ?? 0);

    const encodedData = schemaEncoder.encodeData([
      { name: 'id', value: id, type: 'uint128' },
      { name: 'score', value: score, type: 'uint128' },
      { name: 'tvl', value: tvl ?? 0, type: 'uint128' },
      { name: 'githubStars', value: githubStars ?? 0, type: 'uint128' },
      { name: 'githubActivity', value: githubActivity ?? 0, type: 'uint128' },
      {
        name: 'totalTransactions',
        value: totalTransactions ?? 0,
        type: 'uint128',
      },
      { name: 'gasUsed', value: gasUsed ?? 0, type: 'uint256' },
      { name: 'onchainScore', value: onchainScore, type: 'uint128' },
      { name: 'defillamaScore', value: defillamaScore, type: 'uint128' },
      { name: 'githubScore', value: githubScore, type: 'uint128' },
    ]);

    const schemaUID =
      '0x4b8e4616589c741810271cd9f348acf92baf5701d6756971c579de76bd0a2933';

    const tx = await this.eas.attest({
      schema: schemaUID,
      data: {
        recipient: '0x0000000000000000000000000000000000000000',
        expirationTime: 0n,
        revocable: false,
        data: encodedData,
      },
    }, { gasLimit: 1000000 });

    const newAttestationUID = await tx.wait();



    return newAttestationUID;
  }
}
