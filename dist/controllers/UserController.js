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
exports.UserController = void 0;
const user_1 = require("../modals/user");
const Utils_1 = require("../utils/Utils");
const Jwt = require("jsonwebtoken");
const env_1 = require("../environments/env");
class UserController {
    static signup(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = req.body.email;
            const username = req.body.username;
            const password = req.body.password;
            const contact = req.body.phone;
            const fileUrl = "http://localhost:5000/" + req.file.path;
            try {
                const hash = yield Utils_1.Utils.encryptPassword(password);
                const data = {
                    email,
                    password: hash,
                    username,
                    phone: contact,
                    profile_pic_url: fileUrl,
                };
                let user = yield new user_1.default(data).save();
                res.send(user);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const password = req.body.password;
            const user = req.user;
            try {
                yield Utils_1.Utils.comparePassword({
                    plainPassword: password,
                    encryptedPassword: user.password,
                });
                const token = Jwt.sign({ email: user.email, user_id: user._id }, (0, env_1.getEnvironmentVariables)().jwt_secret, { expiresIn: "120d" });
                const data = { token: token, user: user };
                res.json(data);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static edituser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userid = req.params.id;
            const email = req.body.email;
            const username = req.body.username;
            const password = req.body.password;
            const contact = req.body.phone;
            try {
                let user = yield user_1.default.findOneAndUpdate({ _id: userid }, { email: email,
                    password: password,
                    username: username,
                    phone: contact, }, { new: true });
                res.send(user);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static getalluser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield user_1.default.find({});
                res.send(data);
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
    static getuserbyid(req, res, next) {
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
exports.UserController = UserController;
