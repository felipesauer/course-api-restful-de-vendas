import { Http } from "./infra/http/";
import { Database } from "./infra/database/";

export default class App {
    public async initialization(): Promise<void> {
        await new Http().initialization();
        await new Database().initialization();
    }
}
