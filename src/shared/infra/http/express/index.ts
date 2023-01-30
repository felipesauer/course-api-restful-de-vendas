import "express-async-errors";
import express, {
    Express as coreExpress,
    NextFunction,
    Request,
    Response,
    Router,
} from "express";
import cors from "cors";
import { errors } from "celebrate";
import { rateLimiter } from "./middlewares/";
import { IHttp } from "..";
import routes from "./routes";
import AppError from "@shared/errors/AppError";

export class Express implements IHttp<Router> {
    app: coreExpress;
    routes: Router;

    constructor() {
        this.app = express();
        this.routes = routes;
    }

    async initialization(): Promise<void> {
        this.app
            .use(cors())
            .use(express.json())
            .use(rateLimiter)
            .use(errors())
            .use(this.routes)
            .use(this.internalError);

        this.app.listen(process.env.APP_PORT, () =>
            console.log(`Server started on port ${process.env.APP_PORT}`),
        );
    }

    private async internalError(
        error: Error,
        request: Request,
        response: Response,
        next: NextFunction,
    ) {
        if (error instanceof AppError)
            return response.status(error.statusCode).json({
                status: "error",
                message: error.message,
            });

        return response.status(500).json({
            status: "error",
            message: "Internal server error",
        });
    }
}