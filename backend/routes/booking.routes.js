import { Router } from 'express';
import { createBooking } from '../controllers/booking.controller.js';

const router = Router();

// POST /api/bookings
router.post('/', createBooking);

export default router;