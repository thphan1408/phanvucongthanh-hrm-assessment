import express from "express";
import leaveRequestsController from "../controllers/leave-requests.controller.js";

const leaveRequestsRouter = express.Router();

leaveRequestsRouter.get("/", leaveRequestsController.getAllLeaveRequests);
leaveRequestsRouter.post("/", leaveRequestsController.createLeaveRequest);
leaveRequestsRouter.patch("/:id/approve", leaveRequestsController.approveLeaveRequest);

export default leaveRequestsRouter;
