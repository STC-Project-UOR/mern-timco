import express from "express";
import { createTimber, deleteTimber, getTimbers, updateTimber } from "../controllers/timber.controller.js";
const router = express.Router();

router.get("/", getTimbers);
router.post("/", createTimber);
router.put("/:id", updateTimber);
router.delete("/:id", deleteTimber);

export default router;