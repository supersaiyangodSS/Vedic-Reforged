import { Router } from "express";
import { getSahity } from "../controller/sahityController.js"

const router : Router = Router();

router.get('/sahity', getSahity);

export default router;
