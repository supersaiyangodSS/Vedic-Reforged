import { Router } from "express";
import { getStotras } from "../controller/stotramController.js"

const router : Router = Router();

router.get('/stotram', getStotras);

export default router;
