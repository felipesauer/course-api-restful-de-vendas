import customersRouters from "@modules/customers/infra/http/routes/customers.routes";
import ordersRouters from "@modules/orders/infra/http/routes/orders.routes";
import productsRouters from "@modules/products/infra/http/routes/products.routes";
import profileRouters from "@modules/users/infra/http/routes/profile.routes";
import sessionsRouters from "@modules/users/infra/http/routes/sessions.routes";
import usersRouters from "@modules/users/infra/http/routes/users.routes";
import { Router } from "express";

const routes = Router();

routes.use("/products", productsRouters);
routes.use("/users", usersRouters);
routes.use("/sessions", sessionsRouters);
routes.use("/profile", profileRouters);
routes.use("/customers", customersRouters);
routes.use("/orders", ordersRouters);

export default routes;
