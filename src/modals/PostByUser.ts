import * as mongoose from "mongoose";
import { model } from "mongoose";

const userSchema = new mongoose.Schema(
    {
        title: { type: String, required:true },
        content: { type: String, required:true},
    },
    { timestamps:true }
);

export default model("postbyuser",userSchema );