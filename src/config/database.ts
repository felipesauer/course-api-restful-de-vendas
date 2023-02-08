import { DataSourceOptions } from "typeorm";

interface IDatabaseConfig {
    config: {
        typeorm: DataSourceOptions;
    };
}

export default {
    config: {
        typeorm: {
            type: process.env.DB_TYPE,
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            logging: false,
            synchronize: false,
            entities: ["./src/modules/**/infra/typeorm/entities/*.ts"],
            migrations: ["./src/shared/infra/database/typeorm/migrations/*.ts"],
        },
    },
} as IDatabaseConfig;
