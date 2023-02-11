import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import CustomersController from "../controllers/CustomersController";
import isAuthenticated from "@shared/infra/http/express/middlewares/isAuthenticated";

const customersRouters = Router();
const customersController = new CustomersController();

customersRouters.use(isAuthenticated);

customersRouters.get("/", customersController.index);

customersRouters.get(
    "/:id",
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    customersController.show,
);

customersRouters.post(
    "/",
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
        },
    }),
    customersController.create,
);

customersRouters.put(
    "/:id",
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
        },
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    customersController.update,
);

customersRouters.delete(
    "/:id",
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    customersController.delete,
);

export default customersRouters;
