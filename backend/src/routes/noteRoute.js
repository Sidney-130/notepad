const express = require("express");
const router = express.Router();
const controller = require("../controllers/noteController");
const authenticate = require("../middlewares/authMiddleware");

router.get("/", authenticate, controller.getNotes);
router.post("/", authenticate, controller.createNote);
router.delete("/:id", authenticate, controller.deleteNote);
router.put("/:id", authenticate, controller.updateNote);

module.exports = router;
