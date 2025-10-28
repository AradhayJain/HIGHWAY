import { Router } from 'express';
import { validatePromoCode } from '../controllers/promo.controller.js';

const router = Router();

// POST /api/promo/validate
router.post('/validate', validatePromoCode);

export default router;