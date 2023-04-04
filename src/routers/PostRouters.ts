import { Router } from "express";
import { PostValidators } from "../validaters/PostValidators";
import { PostController } from "../controllers/PostController";
import { GlobalMiddleware } from "../globalmiddileware/globalmiddleware";
export class PostRouter {
  public router: Router;

  constructor() {
    this.router = Router();

    this.getRoutes();

    this.postRoutes();

    this.patchRoutes();

    this.deleteRoutes();
  }
  getRoutes() {
    this.router.get(
      "/getpost",

      PostController.getpost,
      );

      this.router.get(
        "/getpostbyid/:id",
        PostValidators.getpostbyid(),
        GlobalMiddleware.checkError,
        PostController.getpostbyid,
        );
  

  }
  postRoutes() {


    this.router.post(
    "/post",
    PostValidators.post(),
    GlobalMiddleware.checkError,
    PostController.post);

  }

  patchRoutes() {
    this.router.patch(
      "/editpost/:id",
      PostValidators.editpost(),
      GlobalMiddleware.checkError,
      PostController.editpost);
  }

  deleteRoutes() {

    this.router.delete(
      "/deletepost/:id",
      PostValidators.delete(),
      GlobalMiddleware.checkError,
      PostController.delete
    );
  }
}

export default new PostRouter().router;
