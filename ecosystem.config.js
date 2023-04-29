module.exports = {
  apps: [
    {
      name: "web3-lagos",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
        PORT: 3004,
      },
      watch: true,
      ignore_watch: ["node_modules", ".next"],
      time: true,
    },
  ],
};
