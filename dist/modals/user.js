"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: Number, required: true },
    username: { type: String, required: true },
    profile_pic_url: { type: String, required: false },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("users", userSchema);
