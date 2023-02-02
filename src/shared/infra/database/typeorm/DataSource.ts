import "dotenv/config";
import { DataSource as DataSourceTypeorm } from "typeorm";
import database from "../../../../config/database";

export const DataSource = new DataSourceTypeorm(database.config.typeorm);
