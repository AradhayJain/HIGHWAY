import { Router } from 'express';
import { getAllExperiences, getExperienceById, addExperience } from '../controllers/experience.controller.js';

const router = Router();

// NOTE: In a real app, POST, PUT, DELETE routes should be protected by auth middleware
// POST /api/experiences (Admin)
router.post('/', addExperience);

// GET /api/experiences
router.get('/', getAllExperiences);

// GET /api/experiences/:id
router.get('/:id', getExperienceById);

export default router;