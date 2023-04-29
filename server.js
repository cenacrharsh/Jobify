import express from "express";
import notFoundMiddleware from "./middleware/not-found.js";

const app = express();


const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
    return res.send("Welcome To Jobify Backend !!!");
});

//! Middleware
app.use(notFoundMiddleware);

app.listen(PORT, () => {
    console.log(`Server is running on PORT :: ${PORT}`);
});
