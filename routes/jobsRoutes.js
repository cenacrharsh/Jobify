import express from "express";

import {
    createJob,
    getAllJobs,
    updateJob,
    showStats,
    deleteJob,
} from "../controllers/jobsController.js";

const router = express.Router();

router.route("/").post(createJob).get(getAllJobs);

router.route("/stats").get(showStats);

//* if /:id is placed before /stats then the string stats would match the route /:id

router.route("/:id").delete(deleteJob).patch(updateJob);

export default router;
