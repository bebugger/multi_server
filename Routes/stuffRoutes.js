const express = require("express");
const router = express.Router();
const stuffCtrl = require("../Controllers/stuffController");
const auth = require("../Middleware/auth");

router.post("/", auth, stuffCtrl.create);

router.get("/", auth, stuffCtrl.getAll);

router.get("/:id", auth, stuffCtrl.getOne);

router.put("/:id", auth, stuffCtrl.upadte);

router.delete("/:id", auth, stuffCtrl.delete);

module.exports = router;
