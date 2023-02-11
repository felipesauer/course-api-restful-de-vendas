import "express-async-errors";
import express, { Express as coreExpress, Router } from "express";
import cors from "cors";
import { errors } from "celebrate";
import rateLimiter from "./middlewares/rateLimiter";
import internalError from "./middlewares/internalError";
import routes from "./routes/routes";
import { IHttp } from "../models/IHttp";

export class Express implements IHttp<Router> {
    private app: coreExpress;
    routes: Router;

    constructor() {
        this.app = express();
        this.routes = routes;
    }

    async initialize(): Promise<void> {
        this.app
            .use(cors())
            .use(express.json())
            .use(rateLimiter)
            .use(this.routes)
            .use(errors())
            .use(internalError);

        this.app.listen(process.env.APP_PORT, () =>
            console.log(`Server started on port ${process.env.APP_PORT}`),
        );
    }
}
