# retro-red-eth-global-superhack-2023
🔴 A platform showcasing the Optimism ecosystem and contributors 🔴

## What is it ?

This platform serves as a hub for consolidating projects within the optimism ecosystem. Any user has the option to include their project by adhering to a simple data structure in our open-source repository, ensuring its listing on the platform.

For each of these projects, we have diligently collected data using our proprietary indexer, supplementing it with additional information sourced from GitHub and DeFiLlama. This approach ensures a diverse range of impactful insights from various corners of the ecosystem.

Subsequently, we've validated this data on-chain, a step that empowers the optimism foundation in streamlining the RetroPGF process (detailed information available on RetroPGFs), while also granting users the opportunity to explore novel undertakings.

Moreover, users hold the ability to cast their votes in a sybil resistant way in favor of projects they prefer, thereby contributing to their overall appraisal.

## How it is made

1. A backend server developed using NestJS, comprising four main modules:

- An indexer for the optimism chain, which retrieves all interactions related to various smart contracts.
- A list of projects that each user can submit similar to what DeFiLlama does with their adapters. So far we have collected data of 22 different projects.
- A fetcher that collects and consolidates data for each user-submitted project. This involves utilizing on-chain data sourced from the indexer, DeFiLlama data for protocol TVL information, and GitHub data for metrics like star count and repository activity.
- An attester responsible for generating an EAS attestation for each project. This attestation establishes an immutable record for every project.
- An API that facilitates the retrieval of stored data and enables project voting.

2. A frontend developed using Next.js. It fetches project information from the API and also retrieves the EAS attestations to derive project scores.
To ensure a Sybil-resistant voting process, the integration of Gitcoin Passport mandates users to possess a minimum score of 20 or the integration of Worldcoin mandates user to possess a World ID.
Moreover, to safeguard the voting process from centralized API manipulation, a revocable attestation is established using EAS. This attestation is linked to the project's original attestation, ensuring the integrity of the voting system by creating a social graph.

## Getting started

You can launch the whole project by first setting the `.env` at the root of the repository with the environment variables that are in the `.env.example`

Then you just need to use this command:
```
docker compose up
```

## Authors

| [<img src="https://github.com/0xtekgrinder.png?size=85" width=85><br><sub>0xtekgrinder</sub>](https://github.com/0xtekgrinder) | [<img src="https://github.com/0xpanoramix.png?size=85" width=85><br><sub>0xpanoramix</sub>](https://github.com/0xpanoramix)
| :---: | :---: |