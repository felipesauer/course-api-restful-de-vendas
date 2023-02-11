import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import UsersController from "../controllers/UsersController";
import isAuthenticated from "@shared/infra/http/express/middlewares/isAuthenticated";

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.get("/", isAuthenticated, usersController.index);

usersRouter.get(
    "/:id",
    isAuthenticated,
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    usersController.show,
);

usersRouter.post(
    "/",
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        },
    }),
    usersController.create,
);

export default usersRouter;
