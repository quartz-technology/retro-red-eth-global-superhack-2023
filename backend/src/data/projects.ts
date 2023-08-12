import Project from './project.type';

const projects: Project[] = [
  {
    name: 'Aave',
    githubRepos: [
      'aave/aave-protocol',
      'aave/protocol-v2',
      'aave/interface',
      'aave/aave-utilities',
      'aave/gho-core',
      'aave/aave-v3-core',
    ],
    defiLLamaId: 'aave',
    addresses: [
      '0x794a61358D6845594F94dc1DB02A252b5b4814aD',
      '0x76D3030728e52DEB8848d5613aBaDE88441cbc59',
    ],
  },
  {
    name: 'Stargate',
    githubRepos: ['stargate-protocol/stargate'],
    defiLLamaId: 'stargate',
    addresses: ['0xB0D502E938ed5f4df2E681fE6E419ff29631d62b'],
  },
  {
    name: 'Quix',
    githubRepos: ['quixotic-dev/frontend', 'quixotic-dev/backend'],
    addresses: ['0x998EF16Ea4111094EB5eE72fC2c6f4e6E8647666'],
  },
  {
    name: 'Backed',
    githubRepos: [
      'with-backed/backed-protocol',
      'with-backed/backed-interface',
    ],
    addresses: ['0x0BacCDD05a729aB8B56e09Ef19c15f953E10885f'],
  },
  {
    name: 'Hop Exchange',
    githubRepos: [
      'hop-protocol/hop',
      'hop-protocol/contracts',
      'hop-protocol/explorer',
      'hop-protocol/docs',
    ],
    defiLLamaId: 'hop-protocol',
    addresses: [
      '0xb3C68a491608952Cb1257FC9909a537a0173b63B',
      '0x2ad09850b0CA4c7c1B33f5AcD6cBAbCaB5d6e796',
      '0x7D269D3E0d61A05a0bA976b7DBF8805bF844AF3F',
      '0x86cA30bEF97fB651b8d866D45503684b90cb3312',
      '0xf11EBB94EC986EA891Aec29cfF151345C83b33Ec',
      '0x29Fba7d2A6C95DB162ee09C6250e912D6893DCa6',
      '0x19B2162CA4C2C6F08C6942bFB846ce5C396aCB75',
    ],
  },
  {
    name: 'Geo Web',
    githubRepos: [
      'Geo-Web-Project/core-contracts',
      'Geo-Web-Project/cadastre',
      'Geo-Web-Project/browser',
      'Geo-Web-Project/sdk',
    ],
    addresses: ['0xBA1231785A7b4AC0E8dC9a0403938C2182cE4A4e'],
  },
  {
    name: 'Foundry',
    githubRepos: ['foundry-rs/foundry'],
  },
  {
    name: 'Wagmi',
    githubRepos: ['wagmi-dev/wagmi'],
  },
  {
    name: 'Ethers-rs',
    githubRepos: ['gakonst/ethers-rs'],
  },
  {
    name: 'Viem',
    githubRepos: ['wagmi-dev/viem'],
  },
  {
    name: 'Ethers.js',
    githubRepos: ['ethers-io/ethers.js'],
  },
  {
    name: 'Hardhat',
    githubRepos: ['NomicFoundation/hardhat'],
  },
  {
    name: 'Synapse Protocol',
    githubRepos: [
      'synapsecns/synapse-contracts',
      'synapsecns/sanguine',
      'synapsecns/sdk',
    ],
    addresses: ['0xAf41a65F786339e7911F4acDAD6BD49426F2Dc6b'],
    defiLLamaId: 'synapse',
  },
  {
    name: 'Pool together',
    githubRepos: [
      'pooltogether/v4-utils-js',
      'pooltogether/v4-client-js',
      'pooltogether/v4-periphery',
      'pooltogether/v4-ui',
      'pooltogether/v5-testnet',
    ],
    addresses: ['0x79Bc8bD53244bC8a9C8c27509a2d573650A83373'],
    defiLLamaId: 'pooltogether',
  },
  {
    name: 'Velodrome',
    githubRepos: [
      'velodrome-finance/contracts',
      'velodrome-finance/api',
      'velodrome-finance/docs',
    ],
    addresses: [
      '0xa062aE8A9c5e11aaA026fc2670B0D65cCc8B2858',
      '0xF1046053aa5682b4F9a81b5481394DA16BE5FF5a',
    ],
    defiLLamaId: 'velodrome',
  },
  {
    name: 'Polynomial Protocol',
    githubRepos: ['Polynomial-Protocol/polynomial-earn-contracts'],
    addresses: [
      '0xb43c0899ECCf98BC7A0f3e2c2A211d6fc4f9b3fE',
      '0xb28Df1b71a5b3a638eCeDf484E0545465a45d2Ec',
    ],
    defiLLamaId: 'polynomial-protocol',
  },
  {
    name: 'Kwenta',
    githubRepos: ['Kwenta/kwenta'],
    addresses: [
      '0x6e56A5D49F775BA08041e28030bc7826b13489e0',
      '0x1066A8eB3d90Af0Ad3F89839b974658577e75BE2',
      '0x8234F990b149Ae59416dc260305E565e5DAfEb54',
    ],
  },
  {
    name: 'Lyra',
    githubRepos: ['lyra-finance/lyra-protocol', 'lyra-finance/interface'],
    addresses: [
      '0xb8e90fD247700dE65450Aacd4A47B2948Dc59FC1',
      '0x12a4fD54AA321EB16B45310ccb177bd87C6ae447',
      '0xdD0d125475453767e65f1a4dD30B62699FDcc9f5',
    ],
    defiLLamaId: 'lyra',
  },
  {
    name: 'Accross',
    githubRepos: [
      'across-protocol/frontend-v2',
      'across-protocol/contracts-v2',
      'across-protocol/sdk-v2',
      'across-protocol/relayer-v2',
    ],
    addresses: ['0x6f26Bf09B1C792e3228e5467807a900A503c0281'],
  },
  {
    name: 'Thales',
    githubRepos: ['thales-markets/contracts'],
    addresses: ['0x278B5A44397c9D8E52743fEdec263c4760dc1A1A'],
    defiLLamaId: 'thales',
  },
  {
    name: 'Alchemix',
    githubRepos: ['alchemix-finance/v2-foundry'],
    addresses: [
      '0xDB3fE4Da32c2A79654D98e5a41B22173a0AF3933',
      '0x10294d57A419C8eb78C648372c5bAA27fD1484af',
      '0xe04Bb5B4de60FA2fBa69a93adE13A8B3B569d5B4',
      '0xb7C4250f83289ff3Ea9f21f01AAd0b02fb19491a',
      '0x4e7d2115E4FeEcD802c96E77B8e03D98104415fa',
      '0xA7ea9ef9E2b5e15971040230F5d6b75C68Aab723',
      '0xFCD619923456E20EAe298B35E3606277b391BBB4',
    ],
    defiLLamaId: 'alchemix',
  },
  {
    name: 'solhint',
    githubRepos: ['protofire/solhint'],
  },
];

export default projects;
