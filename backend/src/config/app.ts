export default () => ({
  app: {
    port: parseInt(process.env.PORT, 10) || 3000,
    cors: process.env.CORS_ORIGIN,
  },
});
