export default () => ({
  fetcher: {
    enabled: process.env.FETCHER_ENABLED === 'true' || false,
  },
});
