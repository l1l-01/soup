const express = require("express");
const path = require("path");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
const port = 3001;

app.use(
  // All requests starting with /api will be proxied
  "/api",
  createProxyMiddleware({
    target: "http://localhost:3000",
    changeOrigin: true,
    pathRewrite: {
      // Remove /api prefix when forwarding
      "^/api": "",
    },
    // Optional: log requests for debugging
    onProxyReq: (proxyReq, req, res) => {
      console.log(`Proxying ${req.method} ${req.url} → ${proxyReq.path}`);
    },
  }),
);

app.use("/static", express.static(path.join(__dirname, "public")));

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
