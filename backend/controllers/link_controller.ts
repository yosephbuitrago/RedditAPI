import { Router, Request, Response } from "express";
import { getLinkRepository } from "../repositories/link_repository";
import { Repository } from "typeorm";
import { Link } from "../entities/link";

export function getLinkHandlers(_linkRepository: Repository<Link>) {

    const getAllLinksHandler = (req:Request,res:Response)=>{
        (async()=>{
            const links = await _linkRepository.find();
            res.json(links).send();
        })();
    };

    const getLinkByIdHandler = (req: Request, res:Response) =>{
        const id = parseInt(req.params.id);
        (async()=>{
            const link = await _linkRepository.findOne({
                where:{
                    id:id
                }
            });
            if (link===undefined) {
                res.status(404).send();
            }
            res.json(link).send(link);
        })();
    };

    const createLink = (req: Request, res: Response) => {
        (async () => {
            const url = req.body.url;
            const title = req.body.title;
            const user = {id:req.body.uid};

            if (!url || !title || !user) {

                res.status(400).send();

            } else {

                const newLink = await _linkRepository.save({url,title,user}).then((link)=>{
                    return res.status(201).send(link);
                },(e)=>{
                    console.log(`unable to save the link ${e}`);
                    return res.status(400).send(e);
                });
            }            

        })();

    };

    return {
        getAllLinksHandler,
        getLinkByIdHandler,
        createLink
    };    
}

export function getLinkRouter(){
    const handler = getLinkHandlers(getLinkRepository());
    const linkRouter= Router();
    linkRouter.get("/",handler.getAllLinksHandler);
    linkRouter.get("/:id",handler.getLinkByIdHandler);
    linkRouter.post("/",handler.createLink);
    return linkRouter;
}