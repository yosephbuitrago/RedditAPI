import express from "express";
//import { getLinkRouter } from "./backend/controllers/link_controller";
import { getUserRouter } from "./backend/controllers/user_controller";
import bodyParser from "body-parser";



export async function getApp() {
    const app= express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    //app.use("/api/v1/links",getLinkRouter());
    app.use("/api/v1/users",getUserRouter());
    return app;
}