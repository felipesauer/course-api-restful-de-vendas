import { DataSource as DataSourceTypeorm } from "typeorm";
import { IDatabase } from "../models/IDatabase";
import { DataSource } from "./DataSource";

export class Typeorm implements IDatabase<DataSourceTypeorm> {
    dataSource: DataSourceTypeorm;

    constructor() {
        this.dataSource = DataSource;
    }

    async initialize(): Promise<void> {
        await this.dataSource
            .initialize()
            .then(() => console.log("Database connected!"))
            .catch(() => console.log("Error connecting to database!"));
    }
}
