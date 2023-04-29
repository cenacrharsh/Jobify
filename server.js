import express from "express";
import dotenv from "dotenv";

import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import connectDB from "./db/connect.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
    return res.send("Welcome To Jobify Backend !!!");
});

//! Middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

//* we want to start our server if our DB connection is successful
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL);

        console.log("DB is Connected !!!");

        app.listen(PORT, () => {
            console.log(`Server is running on PORT :: ${PORT}`);
        });
    } catch (err) {
        console.log(error);
    }
};
start();
