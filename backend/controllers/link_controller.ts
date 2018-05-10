import { Router, Request, Response } from "express";
import { getLinkRepository } from "../repositories/link_repository";
import { Repository, getRepository } from "typeorm";
import { Link } from "../entities/link";

export function getLinkHandlers(_linkRepository: Repository<Link>) {

    const getAllLinksHandler = (req:Request,res:Response)=>{
        (async()=>{
            const links = await _linkRepository.find();
            res.json(links).send();
        });
    };

    const getLinkByIdHandler = (req: Request, res:Response) =>{
        const id = parseInt(req.params.id);
        const link = _linkRepository.findOne({
            where:{
                id:id
            }
        });
        if (link===undefined) {
            res.status(404).send;
        }
        res.json(link).send
    };

    return {
        getAllLinksHandler,
        getLinkByIdHandler
    };    
}

export function getLinkRouter(){
    const handler = getLinkHandlers(getLinkRepository());
    const linkRouter= Router();
    linkRouter.get("/",handler.getAllLinksHandler);
    linkRouter.get("/:id",handler.getLinkByIdHandler);
    return linkRouter;
}