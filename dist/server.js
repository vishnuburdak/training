"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express = require("express");
const env_1 = require("./environments/env");
const mongoose = require("mongoose");
const cors = require("cors");
const UserRouters_1 = require("./routers/UserRouters");
const PostRouters_1 = require("./routers/PostRouters");
const path = require("path");
class Server {
    constructor() {
        this.app = express();
        this.setConfigurations();
        this.setRoutes();
        this.reactBuild();
        this.error404Handler();
        this.handleErrors();
    }
    setConfigurations() {
        this.connectMongoDb();
        this.app.use(cors({
            origin: ["http://localhost:5000", "http://localhost:3000", "https://backend-dzg3.onrender.com"],
        }));
        this.configureBodyParser();
    }
    connectMongoDb() {
        const databaseUrl = (0, env_1.getEnvironmentVariables)().db_url;
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
        this.app.use("/api/user", UserRouters_1.default);
        this.app.use("/api/blog", PostRouters_1.default);
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
exports.Server = Server;
