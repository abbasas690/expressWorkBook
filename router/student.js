import express from "express";
import {
  allstudent,
  deletestudent,
  putstudent,
  newStudent,
} from "../controllers/student.js";

const router = express.Router();
// const studentContoller = require("../controllers/student")

router.get("/all", allstudent);
router.put("/put", putstudent);
router.post("/post", newStudent);
router.delete("/delete", deletestudent);

export default router;
