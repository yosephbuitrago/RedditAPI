import { Router, Request, Response } from "express";
import { getUserRepository } from "../repositories/user_repository";
import { Repository } from "typeorm";
import { User } from "../entities/user";

export function getUserHandlers(_userRepository: Repository<User>) {

    const getAllUsersHandler = (req:Request,res:Response)=>{
        (async()=>{
            const users = await _userRepository.find();
                res.json(users).send();
        })();
    };

    const getUserByIdHandler = (req: Request, res:Response)=>{
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).send();
        }
        (async()=>{
            const user = await _userRepository.findOneById(id).then((user)=>{
                
                if (!user) {
                    return res.status(404).send();
                }
                return res.send(user);
            
            }).catch((e)=>{
                return res.status(404).send();
            });
        })();
    };

    const createUser = (req: Request, res: Response) => {

        (async () => {

            const email = req.body.email;
            const password = req.body.password;

            if (!email || !password) {

                res.status(400).send();

            } else {

                const newUser = await _userRepository.save({ email: email, password:password}).then((User)=>{
                    return res.status(201).send(User);
                },(e)=>{
                    console.log(`unable to save the user ${e}`);
                    return res.send(e);
                });
            }            

        })();

    };

    return {
        getAllUsersHandler,
        getUserByIdHandler,
        createUser
    };
    
   
}

export function getUserRouter(){
    const handler = getUserHandlers(getUserRepository());
    const userRouter = Router();
    userRouter.get("/",handler.getAllUsersHandler);
    userRouter.get("/:id",handler.getUserByIdHandler);
    userRouter.post("/",handler.createUser);
    return userRouter;
}