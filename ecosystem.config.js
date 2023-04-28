module.exports = {
  apps: [
    {
      name: "web3-lagos",
      script: "node_modules/next/dist/bin/next",
      args: "start",
      env: {
        NODE_ENV: "production",
        PORT: 3004,
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
      },
      watch: true,
      ignore_watch: ["node_modules", ".next"],
      time: true,
    },
  ],
};
