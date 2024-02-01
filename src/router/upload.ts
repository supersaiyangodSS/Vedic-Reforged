import { Router } from "express";
import { uploadSahitya } from "../controller/uploadController.js";
import { isAuth } from "../app.js";
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = Router();

router.post('/sahity', isAuth, upload.single('jsonFile'), uploadSahitya);

export default router;
