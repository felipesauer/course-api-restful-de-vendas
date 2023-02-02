import "reflect-metadata";
import "dotenv/config";
import "./shared/container";
import App from "./shared/app";

new App()
    .initialization()
    .then(() => console.log("API initialized successfully!"))
    .catch(e => console.log("Error starting API!", e));
