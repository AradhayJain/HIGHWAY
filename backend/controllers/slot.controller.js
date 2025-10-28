import { Slot } from '../models/slot.model.js';
import { Experience } from '../models/experience.model.js';
import mongoose from 'mongoose';

/**
 * @desc    Add a new slot for an experience (Admin)
 * @route   POST /api/slots
 * @access  Private/Admin
 */
export const addSlot = async (req, res) => {
    try {
        const { experienceId, date, startTime, totalCapacity } = req.body;

        // 1. Basic validation
        if (!experienceId || !date || !startTime || !totalCapacity) {
            return res.status(400).json({ message: "experienceId, date, startTime, and totalCapacity are required." });
        }

        // 2. Check if experienceId is valid
        if (!mongoose.Types.ObjectId.isValid(experienceId)) {
            return res.status(400).json({ message: "Invalid experience ID" });
        }
        
        // 3. Check if the experience actually exists
        const experience = await Experience.findById(experienceId);
        if (!experience) {
            return res.status(404).json({ message: "Experience not found. Cannot add slot." });
        }
        
        // 4. Create and save the new slot
        const newSlot = new Slot({
            experienceId,
            date,
            startTime,
            totalCapacity,
            bookedCount: 0 // Explicitly set to 0
        });

        const savedSlot = await newSlot.save();
        res.status(201).json(savedSlot);

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};