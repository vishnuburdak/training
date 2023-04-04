"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = require("express");
const UserValidater_1 = require("../validaters/UserValidater");
const UserController_1 = require("../controllers/UserController");
const globalmiddleware_1 = require("../globalmiddileware/globalmiddleware");
const Utils_1 = require("../utils/Utils");
class UserRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }
    getRoutes() {
        this.router.get("/getalluser", UserController_1.UserController.getalluser);
        this.router.get("/getuserbyid/:id", UserValidater_1.UserValidators.getuserbyid(), globalmiddleware_1.GlobalMiddleware.checkError, UserController_1.UserController.getuserbyid);
    }
    postRoutes() {
        this.router.post("/signup", new Utils_1.Utils().multer.single("profile_pic"), UserValidater_1.UserValidators.signup(), globalmiddleware_1.GlobalMiddleware.checkError, UserController_1.UserController.signup);
        this.router.post("/login", UserValidater_1.UserValidators.login(), globalmiddleware_1.GlobalMiddleware.checkError, UserController_1.UserController.login);
    }
    patchRoutes() {
        this.router.patch("/edituser/:id", UserValidater_1.UserValidators.edituser(), globalmiddleware_1.GlobalMiddleware.checkError, UserController_1.UserController.edituser);
    }
    deleteRoutes() {
        this.router.delete("/delete/:id", UserValidater_1.UserValidators.delete(), globalmiddleware_1.GlobalMiddleware.checkError, UserController_1.UserController.delete);
    }
}
exports.UserRouter = UserRouter;
exports.default = new UserRouter().router;
