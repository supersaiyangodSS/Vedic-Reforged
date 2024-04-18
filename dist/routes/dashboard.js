import { Router } from "express";
const router = Router();
router.get('/', (req, res) => {
    res.render('dashboard', {
        title: 'Shri Swami Samarth'
    });
});
export default router;
//# sourceMappingURL=dashboard.js.map