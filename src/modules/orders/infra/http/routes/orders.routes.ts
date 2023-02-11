import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import OrdersController from "../controllers/OrdersController";
import isAuthenticated from "@shared/infra/http/express/middlewares/isAuthenticated";

const ordersRouters = Router();
const orderController = new OrdersController();

ordersRouters.use(isAuthenticated);

ordersRouters.get(
    "/:id",
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    orderController.show,
);

ordersRouters.post(
    "/",
    celebrate({
        [Segments.BODY]: {
            customer_id: Joi.string().uuid().required(),
            products: Joi.required(),
        },
    }),
    orderController.create,
);

export default ordersRouters;
