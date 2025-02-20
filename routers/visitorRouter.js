const express = require("express");
const router = express.Router();
const visitorController = require("../controllers/visitorController");

router.get("/", visitorController.getAll);

router.get("/detail/:id", visitorController.visitorOne);

router.get("/write/:id", visitorController.moveWrite);

router.post("/post/test", visitorController.createTest);

router.delete("/delete/:id", visitorController.deleteData);

router.put("/update", visitorController.dataUpdate);

module.exports = router;
