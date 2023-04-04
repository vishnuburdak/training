import * as mongoose from "mongoose";
import { model } from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email: { type: String, required:true },
        password: { type: String, required:true},
        phone: { type: Number, required:true},
        username: { type: String, required:true},
        profile_pic_url: { type: String, required: false },
    },
    { timestamps:true }
);

export default model("users",userSchema );