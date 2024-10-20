import express from "express";
import { createSubject, deleteSubject, getSubjects, updateSubject } from "../contoller/subject-controller.js";

const router = express.Router();

// GET route
router.get("/", getSubjects);
router.post("/", createSubject)
router.put("/:id", updateSubject);
router.delete("/:id", deleteSubject);

export default router;
