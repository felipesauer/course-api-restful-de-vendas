import { Typeorm } from "./typeorm";

export interface IDatabase<T> {
    initialization(): Promise<void>;
    dataSource: T;
}

export const Database = new Typeorm();
