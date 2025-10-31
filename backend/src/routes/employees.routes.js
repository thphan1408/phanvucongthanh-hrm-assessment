import express from "express";
import employeesController from "../controllers/employees.controller.js";

const employeesRouter = express.Router();

employeesRouter.get("/", employeesController.getAllEmployees);
employeesRouter.post("/", employeesController.createEmployee);
employeesRouter.get("/:id", employeesController.getEmployeeById);
employeesRouter.delete("/:id", employeesController.deleteEmployee); 

export default employeesRouter;