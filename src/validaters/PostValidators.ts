import { body, param } from "express-validator"; 
import PostByUser from "../modals/PostByUser"
export class PostValidators {
    static post() {
      return [
        body("title", "Title is Required").isString(),
        body("content", "Content is Required").isString(),
      ];
    }




    static delete() {
        return [
          param("id").custom((id, { req }) => {
            return PostByUser.findOne({ _id: id }).then((user) => {
              if (user) {
                req.user = user;
                return true;
              } else {
                throw new Error("User Does Not Exist");
              }
            });
          }),
        ];
      }
  
      static editpost() {
        return [
            body("title", "Title is Required").isString(),
            body("content", "Content is Required").isString(),
        ];
      }
  



    static getpostbyid() {
        return [
          param("id").custom((id, { req }) => {
            return PostByUser.findOne({ _id: id }).then((user) => {
              if (user) {
                req.user = user;
                return true;
              } else {
                throw new Error("User Does Not Exist");
              }
            });
          }),
        ];
      }


  }
  