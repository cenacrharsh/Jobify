import express from "express";
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";

const app = express();

const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
    throw new Error("error");
    return res.send("Welcome To Jobify Backend !!!");
});

//! Middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
    console.log(`Server is running on PORT :: ${PORT}`);
});
