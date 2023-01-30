import "dotenv/config";
import { DataSource } from "typeorm";
import database from "../../../../config/database";

export const dataSource = new DataSource(database.config.typeorm);
