import { Express } from "./express";

export interface IHttp<T> {
    initialization(): Promise<void>;
    routes: T;
}

export const Http = new Express();
