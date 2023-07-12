import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import "express-async-errors";

dotenv.config();

const app = express();

//! DB and Authenticate User
import connectDB from "./db/connect.js";

//! Routers
import authRouter from "./routes/authRoutes.js";
import jobsRouter from "./routes/jobsRoutes.js";

//! Middleware
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";

const PORT = process.env.PORT || 8000;

//* Setup Morgan
if (process.env.NODE_ENV !== "production") {
    app.use(morgan("dev"));
}

//* Makes the JSON data available to us
app.use(express.json());

app.get("/", (req, res) => {
    return res.send("Welcome To Jobify Backend !!!");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", jobsRouter);

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
