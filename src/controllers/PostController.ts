import PostByUser from "../modals/PostByUser"

export class PostController {
    static async post(req, res, next) {
        const title = req.body.title;
        const content = req.body.content;

        try {

    
            const data = {
              title,
              content,
            };
            let user = await new PostByUser(data).save();
            res.send(user);
          } catch (error) {
            next(error);
          }

    }

    static async delete(req, res, next) {
        const deleteuser = req.user;
        try {
          const deleteduser = await deleteuser.remove();
          res.send(deleteduser);
        } catch (error) {
          next(error);
        }
      }
    


      static async editpost(req, res, next) {
    
        const userid = req.params.id
          const title = req.body.title;
        const content = req.body.content;
     
        
  
        try {
          
          let user = await PostByUser.findOneAndUpdate({_id:userid},{ title:title,
            content:content,},{new:true});

          res.send(user);
        } catch (error) {
          next(error);
        }
      }
    



    
  static async getpost(req, res, next) {
    try {
      const data = await PostByUser.find({});
      res.send(data);
  
    } catch (error) {
      next(error);
    }
  
    }
  

     
  static async getpostbyid(req, res, next) {
    const user = req.user;
    try {
      res.send(user);
    } catch (error) {
      next(error);
    }
  }



}