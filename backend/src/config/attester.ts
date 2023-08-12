export default () => ({
  attester: {
    enabled: process.env.ATTESTER_ENABLED === 'true' || false,
    privateKey: process.env.ATTESTER_PRIVATE_KEY,
  },
});
