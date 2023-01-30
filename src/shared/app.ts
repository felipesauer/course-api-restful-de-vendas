import { Http } from "./infra/http";
import { Database } from "./infra/database";

export default class App {
    constructor() {
        this.initialization();
    }

    private async initialization(): Promise<void> {
        await Http.initialization();
        await Database.initialization();
    }
}
