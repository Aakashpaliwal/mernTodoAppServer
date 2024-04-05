import express from "express";
import { signin, signup, thirdPartyUser } from "../Controllers/users.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/thirdpartysignin", thirdPartyUser);

export default router;