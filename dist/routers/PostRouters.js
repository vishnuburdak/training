"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostRouter = void 0;
const express_1 = require("express");
const PostValidators_1 = require("../validaters/PostValidators");
const PostController_1 = require("../controllers/PostController");
const globalmiddleware_1 = require("../globalmiddileware/globalmiddleware");
class PostRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }
    getRoutes() {
        this.router.get("/getpost", PostController_1.PostController.getpost);
        this.router.get("/getpostbyid/:id", PostValidators_1.PostValidators.getpostbyid(), globalmiddleware_1.GlobalMiddleware.checkError, PostController_1.PostController.getpostbyid);
    }
    postRoutes() {
        this.router.post("/post", PostValidators_1.PostValidators.post(), globalmiddleware_1.GlobalMiddleware.checkError, PostController_1.PostController.post);
    }
    patchRoutes() {
        this.router.patch("/editpost/:id", PostValidators_1.PostValidators.editpost(), globalmiddleware_1.GlobalMiddleware.checkError, PostController_1.PostController.editpost);
    }
    deleteRoutes() {
        this.router.delete("/deletepost/:id", PostValidators_1.PostValidators.delete(), globalmiddleware_1.GlobalMiddleware.checkError, PostController_1.PostController.delete);
    }
}
exports.PostRouter = PostRouter;
exports.default = new PostRouter().router;
