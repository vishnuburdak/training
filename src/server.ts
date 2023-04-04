import * as express from "express";
import { getEnvironmentVariables } from "./environments/env";
import * as mongoose from "mongoose";
import * as cors from "cors";
import UserRouter from "./routers/UserRouters";
import PostRouter from "./routers/PostRouters";
import * as path from "path";


export class Server {
  public app: express.Application = express();

  constructor() {
    this.setConfigurations();
    this.setRoutes();
    this.reactBuild();
    this.error404Handler();
    this.handleErrors();
  }

  setConfigurations() {
    this.connectMongoDb();
    this.app.use(
      cors({
        origin: ["http://localhost:5000", "http://localhost:3000","https://backend-dzg3.onrender.com"],
      })
    );
    this.configureBodyParser();
  }

  connectMongoDb() {
    const databaseUrl = getEnvironmentVariables().db_url;
    const connection = mongoose.connect(databaseUrl).then(() => {
      console.log("mongodb is connected");
    });
  }

  configureBodyParser() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  setRoutes() {
    this.app.use("/src/images", express.static("src/images"));
    this.app.use("/api/user", UserRouter);
    this.app.use("/api/blog", PostRouter);
  }

  reactBuild() {
    this.app.use(express.static(path.join(__dirname, "build")));
    this.app.get("/*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "build", "index.html"));
    });
  }

  error404Handler() {
    this.app.use((req, res) => {
      res.status(404).json({
        message: "Not Found",
        status_code: 404,
      });
    });
  }

  handleErrors() {
    this.app.use((error, req, res, next) => {
      const errorStatus = req.errorStatus || 500;
      res.status(errorStatus).json({
        message: error.message || "Something Went Wrong. Please Try Again",
        status_code: errorStatus,
      });
    });
  }
}
