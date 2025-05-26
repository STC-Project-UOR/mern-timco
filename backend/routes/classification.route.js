import express from "express";
import { createClassification, deleteClassification, getClassifications, updateClassification } from "../controllers/classification.controller.js";
const router = express.Router();

router.get("/", getClassifications);
router.post("/", createClassification);
router.put("/:id", updateClassification);
router.delete("/:id", deleteClassification);

export default router;