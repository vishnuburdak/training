"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostController = void 0;
const PostByUser_1 = require("../modals/PostByUser");
class PostController {
    static post(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const title = req.body.title;
            const content = req.body.content;
            try {
                const data = {
                    title,
                    content,
                };
                let user = yield new PostByUser_1.default(data).save();
                res.send(user);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteuser = req.user;
            try {
                const deleteduser = yield deleteuser.remove();
                res.send(deleteduser);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static editpost(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userid = req.params.id;
            const title = req.body.title;
            const content = req.body.content;
            try {
                let user = yield PostByUser_1.default.findOneAndUpdate({ _id: userid }, { title: title,
                    content: content, }, { new: true });
                res.send(user);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static getpost(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield PostByUser_1.default.find({});
                res.send(data);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static getpostbyid(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.user;
            try {
                res.send(user);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.PostController = PostController;
