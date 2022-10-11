/* eslint-disable no-unused-vars */
require("core-js/stable");
require("regenerator-runtime/runtime");
require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3005;

// Set up the app with express
const http = require("http");
const server = http.createServer(app);
const prefix = "/api/v1/";
app.use(cors());
app.use(
  cors({
    origin: "*",
  })
);
const userRoute = require("../src/users/routes/index.routes");

app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());
app.use(`${prefix}users`, userRoute);

app.use((err: any, req: any, res: any, next: any) => {
  res.status(500).send({ data: "Select the right upload type" });
});

const customExpress = Object.create(express().response, {
  data: {
    value(data: any, message = "success", status = true) {
      return this.type("json").json({
        status,
        data,
        message,
      });
    },
  },
  error: {
    value(error: any, message = "An error occured", code: any) {
      return this.status(code || 500).json({
        message,
        statusCode: -3,
        status: false,
        error,
      });
    },
  },
  errorMessage: {
    value(message = "API response message", code: any) {
      return this.status(code || 400).json({
        message,
        statusCode: 1,
        status: false,
      });
    },
  },
});

app.response = Object.create(customExpress);

app.use((err: any, req: any, res: any, next: any) => {
  if (err.type && err.type === "entity.parse.failed") {
    res.status(400).errorMessage("Invalid JSON payload passed.");
  } else {
    console.log(
      err.response
        ? [err.response.data.toString().split("\n")[0], req.originalUrl].join()
        : err.stack
        ? [err.toString().split("\n")[0], req.originalUrl].join()
        : [err.toString().split("\n")[0], req.originalUrl].join()
    );

    res.status(err?.response?.status || 500).send({
      mesage: "Internal Server Error",
      description: `Something broke!. Check application logs for helpful tips. OriginalUrl: ${req.originalUrl}  `,
    });
  }
});

app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});

// export default app;

export default app;
