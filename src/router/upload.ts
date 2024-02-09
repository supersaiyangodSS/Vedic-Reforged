import { Router } from "express";
import { uploadSahity, uploadMantra, uploadStotra } from "../controller/uploadController.js";
import { isAuth } from "../app.js";
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = Router();

router.post('/sahity', isAuth, upload.single('jsonFile'), uploadSahity);
router.post('/mantra', isAuth, upload.single('jsonFile'), uploadMantra);
router.post('/stotra', isAuth, upload.single('jsonFile'), uploadStotra);

export default router;
