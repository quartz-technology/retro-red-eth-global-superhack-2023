export default () => ({
  fetcher: {
    enabled: process.env.FETCHER_ENABLED === 'true' || false,
    githubToken: process.env.FETCHER_GITHUB_TOKEN,
  },
});
