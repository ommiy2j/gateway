const gateway = require("fast-gateway");
const port = 8081;
const cors = require("cors");

const server = gateway({
  routes: [
    {
      prefix: "/airbyte",
      target: "http://139.84.135.98:8000/",
      changeOrigin: true,
      allowedHeaders: "Content-Type, Authorization",
      cors: true,
      allowedOrigins: [
        "https://c749-103-171-98-62.in.ngrok.io",
        "http://localhost:3000",
      ],
      methods: ["GET", "DELETE", "POST", "PUT", "PATCH"],
      rewriteHeaders: {
        Authorization: "Basic " + btoa("airbyte:password"),
      },
      middleware: [
        cors({
          origin: "*",
          methods: ["POST", "GET", "PATCH", "DELETE"],
          allowedHeaders: ["Content-Type", "Authorization"],
        }),
      ],
    },
    {
      prefix: "/todos",
      target: "https://localhost:3002",
    },
  ],
  addResponseHeaders: {
    "Access-Control-Allow-Credentials": "true",
  },
});

const corsOptions = {
  origin: "*",
  methods: ["POST", "GET", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
server.use(cors(corsOptions));


server.get("/api-gateway", (req, res) => res.send("Api- gateway connected!"));
server.start(port);
