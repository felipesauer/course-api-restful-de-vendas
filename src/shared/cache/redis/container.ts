import { container } from "tsyringe";
import { createClientRedis, ICreateClientRedis } from "./createClientRedis";

container.registerSingleton<ICreateClientRedis>(
    "createClientRedis",
    createClientRedis,
);
