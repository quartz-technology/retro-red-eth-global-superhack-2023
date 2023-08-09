export default () => ({
  indexer: {
    enabled: process.env.INDEXER_ENABLED === 'true' || false,
    startBlock: parseInt(process.env.INDEXER_START_BLOCK, 10) || 0,
    batchSize: parseInt(process.env.INDEXER_BATCH_SIZE, 10) || 100,
    endBlock: parseInt(process.env.INDEXER_END_BLOCK, 10) || 0,
    jsonRpcUrl: process.env.INDEXER_JSON_RPC_URL,
  },
});
