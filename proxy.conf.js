const PROXY_CONFIG = [
  // Security
  {
    context: ["/user", "/tools"],
    target: "https://dev.universales.com/security/",
    secure: false,
    changeOrigin: true,
    logLevel: "debug",
  },
];

module.exports = PROXY_CONFIG;
