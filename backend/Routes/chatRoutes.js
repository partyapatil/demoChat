const express =require("express")

const {protect}=require("../middleware/authMiddleware");
const { route } = require("./userRoutes");
const { accessChat, fetchChats, createGroupChat, renameGroup, removeFromGroup, addToGroup } = require("../controller/chatControlles");


const router = express.Router();

router.route("/").post(protect, accessChat);
router.route("/").get(protect, fetchChats);
router.route("/group").post(protect, createGroupChat);
router.route("/rename").put(protect, renameGroup);
router.route("/groupremove").put(protect, removeFromGroup);

router.route("/AddTogroup").put(protect, addToGroup);

module.exports = router;