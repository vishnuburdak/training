"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostValidators = void 0;
const express_validator_1 = require("express-validator");
const PostByUser_1 = require("../modals/PostByUser");
class PostValidators {
    static post() {
        return [
            (0, express_validator_1.body)("title", "Title is Required").isString(),
            (0, express_validator_1.body)("content", "Content is Required").isString(),
        ];
    }
    static delete() {
        return [
            (0, express_validator_1.param)("id").custom((id, { req }) => {
                return PostByUser_1.default.findOne({ _id: id }).then((user) => {
                    if (user) {
                        req.user = user;
                        return true;
                    }
                    else {
                        throw new Error("User Does Not Exist");
                    }
                });
            }),
        ];
    }
    static editpost() {
        return [
            (0, express_validator_1.body)("title", "Title is Required").isString(),
            (0, express_validator_1.body)("content", "Content is Required").isString(),
        ];
    }
    static getpostbyid() {
        return [
            (0, express_validator_1.param)("id").custom((id, { req }) => {
                return PostByUser_1.default.findOne({ _id: id }).then((user) => {
                    if (user) {
                        req.user = user;
                        return true;
                    }
                    else {
                        throw new Error("User Does Not Exist");
                    }
                });
            }),
        ];
    }
}
exports.PostValidators = PostValidators;
