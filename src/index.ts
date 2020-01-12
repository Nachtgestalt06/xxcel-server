import App from "./app";
import "reflect-metadata";

const server = App.instance;

server.start(() => {
    console.log(`Server running in port ${server.port}`);
});
