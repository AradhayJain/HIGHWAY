import { Router } from 'express';
import { addSlot } from '../controllers/slot.controller.js';

const router = Router();

// NOTE: In a real app, this route should be protected by auth middleware
// POST /api/slots (Admin)
router.post('/', addSlot);

export default router;