const cors = require("cors");
const jsonServer = require("json-server");
const path = require("path");

const app = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middleware = jsonServer.defaults();
const port = process.env.PORT || 3000;

// Enable all CORS requests.
app.use(cors());

// Index route message.
app.get("/", (_req, _res, next) => {
  next({
    message: "No resource found. Please access emojis at /api/emojis.",
    status: 404,
  });
});

// Generic logging middleware.
app.use(middleware);

// Only allow GET requests.
app.use((req, _res, next) => {
  if (req.method !== "GET") {
    next({
      message: "Request method is not authorized.",
      status: 401,
    });
  }

  next();
});

// Mount routes.
app.use("/api", router);

// Error handler.
app.use(
  ({ status = 500, message = "Internal server error." }, _req, res, _next) => {
    res.status(status).json({ error: message });
  }
);

app.listen(port);
