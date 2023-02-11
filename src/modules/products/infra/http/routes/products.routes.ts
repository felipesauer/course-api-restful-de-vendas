import { Router } from "express";
import ProductsController from "../controllers/ProductsController";
import { celebrate, Joi, Segments } from "celebrate";

const productsRouters = Router();
const productsController = new ProductsController();

productsRouters.get("/", productsController.index);

productsRouters.get(
    "/:id",
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    productsController.show,
);

productsRouters.post(
    "/",
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            price: Joi.number().precision(2).required(),
            quantity: Joi.number().required(),
        },
    }),
    productsController.create,
);

productsRouters.put(
    "/:id",
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            price: Joi.number().precision(2).required(),
            quantity: Joi.number().required(),
        },
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    productsController.update,
);

productsRouters.delete(
    "/:id",
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    productsController.delete,
);

export default productsRouters;
