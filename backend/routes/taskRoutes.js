


import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  getSingleTask,
} from "../controllers/taskController.js";

const router = express.Router();

router.route("/")
  .post(protect, createTask)
  .get(protect, getTasks);

router.route("/:id")
  .put(protect, updateTask)
  .delete(protect, deleteTask);

  router.get("/:id", protect, getSingleTask);
export default router;