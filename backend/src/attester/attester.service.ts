import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EasService } from 'src/eas/eas.service';
import { ProjectService } from 'src/project/project.service';

@Injectable()
export class AttesterService implements OnModuleInit {
  constructor(
    private readonly configService: ConfigService,
    private readonly projectService: ProjectService,
    private readonly easService: EasService,
  ) {}

  async onModuleInit() {
    if (this.configService.get('attester.enabled')) {
      console.log('Attester started');

      const projects = await this.projectService.findAll();

      const tvlProjects = projects
        .filter((project) => project.tvl != null)
        .sort((a, b) => a.tvl - b.tvl);
      const githubStarsProjects = projects
        .filter((project) => project.githubStars != null)
        .sort((a, b) => a.githubStars - b.githubStars);
      const githubActivityProjects = projects
        .filter((project) => project.githubActivity != null)
        .sort((a, b) => a.githubActivity - b.githubActivity);
      const totalTransactionsProjects = projects
        .filter((project) => project.totalTransactions != null)
        .sort((a, b) => a.totalTransactions - b.totalTransactions);
      const gasUsedProjects = projects.filter(
        (project) => project.gasUsed != null,
      );

      for (let i = 0; i < gasUsedProjects.length; i++) {
        for (let j = 0; j < gasUsedProjects.length - i - 1; j++) {
          if (
            BigInt(gasUsedProjects[j].gasUsed) >
            BigInt(gasUsedProjects[j + 1].gasUsed)
          ) {
            const temp = gasUsedProjects[j];
            gasUsedProjects[j] = gasUsedProjects[j + 1];
            gasUsedProjects[j + 1] = temp;
          }
        }
      }

      const tvlMinimum = tvlProjects[0].tvl;
      const tvlMaximum = tvlProjects[tvlProjects.length - 1].tvl;
      const githubStarsMinimum = githubStarsProjects[0].githubStars;
      const githubStarsMaximum =
        githubStarsProjects[githubStarsProjects.length - 1].githubStars;
      const githubActivityMinimum = githubActivityProjects[0].githubActivity;
      const githubActivityMaximum =
        githubActivityProjects[githubActivityProjects.length - 1]
          .githubActivity;
      const totalTransactionsMinimum =
        totalTransactionsProjects[0].totalTransactions;
      const totalTransactionsMaximum =
        totalTransactionsProjects[totalTransactionsProjects.length - 1]
          .totalTransactions;
      const gasUsedMinimum = gasUsedProjects[0].gasUsed;
      const gasUsedMaximum =
        gasUsedProjects[gasUsedProjects.length - 1].gasUsed;

      for (const project of projects) {
        console.log('Attesting', project.name);

        const {
          id,
          tvl,
          githubActivity,
          githubStars,
          totalTransactions,
          gasUsed,
        } = project;

        const defillamaScore = await this.computeDefiLlamaScore({
          tvl,
          tvlMaximum,
          tvlMinimum,
        });
        const githubScore = await this.computeGithubScore({
          githubActivity,
          githubStars,
          githubActivityMaximum,
          githubActivityMinimum,
          githubStarsMaximum,
          githubStarsMinimum,
        });
        const onchainScore = await this.computeOnChainScore({
          totalTransactions,
          gasUsed,
          totalTransactionsMaximum,
          totalTransactionsMinimum,
          gasUsedMaximum,
          gasUsedMinimum,
        });

        let score = 0;
        let count = 0;
        if (defillamaScore !== undefined) {
          score += defillamaScore;
          count++;
        }
        if (githubScore !== undefined) {
          score += githubScore;
          count++;
        }
        if (onchainScore !== undefined) {
          score += onchainScore;
          count++;
        }

        score /= count;

        const attestation = await this.easService.attestProject({
          id,
          tvl,
          githubActivity,
          githubStars,
          totalTransactions,
          gasUsed,
          defillamaScore,
          githubScore,
          onchainScore,
          score,
        });

        project.easAttestation = attestation;
        await this.projectService.update(id, project);
      }
      console.log('Attester finished');
    }
  }

  async computeDefiLlamaScore({
    tvl,
    tvlMinimum,
    tvlMaximum,
  }: {
    tvl?: number;
    tvlMinimum: number;
    tvlMaximum: number;
  }): Promise<number | undefined> {
    if (tvl == null) {
      return undefined;
    }
    return ((tvl - tvlMinimum) / (tvlMaximum - tvlMinimum)) * 100;
  }

  async computeGithubScore({
    githubActivity,
    githubActivityMinimum,
    githubActivityMaximum,
    githubStars,
    githubStarsMinimum,
    githubStarsMaximum,
  }: {
    githubActivity?: number;
    githubStars?: number;
    githubActivityMinimum: number;
    githubActivityMaximum: number;
    githubStarsMinimum: number;
    githubStarsMaximum: number;
  }): Promise<number | undefined> {
    if (githubActivity == null || githubStars == null) {
      return undefined;
    }
    return (
      (((githubActivity - githubActivityMinimum) /
        (githubActivityMaximum - githubActivityMinimum)) *
        100 +
        ((githubStars - githubStarsMinimum) /
          (githubStarsMaximum - githubStarsMinimum)) *
          100) /
      2
    );
  }

  async computeOnChainScore({
    totalTransactions,
    totalTransactionsMinimum,
    totalTransactionsMaximum,
    gasUsed,
    gasUsedMinimum,
    gasUsedMaximum,
  }: {
    totalTransactions?: number;
    gasUsed?: string;
    totalTransactionsMinimum: number;
    totalTransactionsMaximum: number;
    gasUsedMinimum: string;
    gasUsedMaximum: string;
  }): Promise<number | undefined> {
    if (totalTransactions == null || gasUsed == null) {
      return undefined;
    }
    return (
      (((totalTransactions - totalTransactionsMinimum) /
        (totalTransactionsMaximum - totalTransactionsMinimum)) *
        100 +
        Number(
          ((BigInt(gasUsed) - BigInt(gasUsedMinimum)) /
            (BigInt(gasUsedMaximum) - BigInt(gasUsedMinimum))) *
            100n,
        )) /
      2
    );
  }
}
