import { Express } from "./infra/http/express/Express";
import { Typeorm } from "./infra/database/typeorm/Typeorm";

export default class App {
    public async initialize(): Promise<void> {
        new Express().initialize();
        new Typeorm().initialize();
    }
}
