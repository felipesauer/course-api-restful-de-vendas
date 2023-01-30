import { DataSource } from "typeorm";
import { IDatabase } from "..";
import { dataSource } from "./DataSource";

export class Typeorm implements IDatabase<DataSource> {
    dataSource: DataSource;

    constructor() {
        this.dataSource = dataSource;
    }

    async initialization(): Promise<void> {
        await this.dataSource
            .initialize()
            .then(() => console.log("Database connected!"))
            .catch(() => console.log("Error connecting to database!"));
    }
}
