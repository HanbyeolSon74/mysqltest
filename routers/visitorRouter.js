import express from "express";
import visitorController from "../controllers/visitorController.js"; // import로 변경

const router = express.Router();

router.get("/", visitorController.getAll);

router.get("/detail/:id", visitorController.visitorOne);

router.get("/write/:id", visitorController.moveWrite);

router.post("/post/add", visitorController.createTest);

router.delete("/delete/:id", visitorController.deleteData);

router.put("/update", visitorController.dataUpdate);

export default router;
