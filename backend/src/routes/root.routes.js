import express from "express";
import employeesRouter from "./employees.routes.js";
import leaveRequestsRouter from "./leave-requests.routes.js";

const rootRouter = express.Router();

rootRouter.use("/employees", employeesRouter);
rootRouter.use("/leave", leaveRequestsRouter);

export default rootRouter;