import { Router } from "express";
import { getSahity } from "../controller/sahityController.js"
import { getStotra } from "../controller/stotraController.js";

const router : Router = Router();

router.get('/sahity', getSahity);
router.get('/stotra', getStotra);

export default router;
