import cors from "cors"
import express from "express";
import { initDB } from "./db/index.js"
import { ToDosRequestHandler } from "./handlers/todos.js"


const Api = express();

Api.use(cors());
Api.use(express.json());
Api.use(express.urlencoded({ extended:false}));
Api.use("/api/v1", ToDosRequestHandler);


// Api.get("/test", (request, response) => {
//     response.send({ message: "It works!"});
// });

Api.listen(3000, () => {
    console.log("API is running!\n");
    initDB().then(() => {
        console.log("DB is ready!");
    });
});
 
