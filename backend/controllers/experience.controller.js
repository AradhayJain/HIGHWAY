import { Experience } from '../models/experience.model.js';
import { Slot } from '../models/slot.model.js';
import mongoose from 'mongoose';

/**
 * @desc    Add a new experience (Admin)
 * @route   POST /api/experiences
 * @access  Private/Admin
 */
export const addExperience = async (req, res) => {
    try {
        const { name, description, price, location, images } = req.body;

        // Basic validation
        if (!name || !description || !price) {
            return res.status(400).json({ message: "Name, description, and price are required." });
        }

        const newExperience = new Experience({
            name,
            description,
            price,
            location,
            images
        });

        const savedExperience = await newExperience.save();
        res.status(201).json(savedExperience);

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

/**
 * @desc    Fetch all experiences
 * @route   GET /api/experiences
 * @access  Public
 */
export const getAllExperiences = async (req, res) => {
    try {
        const experiences = await Experience.find({});
        res.status(200).json(experiences);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

/**
 * @desc    Fetch a single experience by ID, including its slots
 * @route   GET /api/experiences/:id
 * @access  Public
 */
export const getExperienceById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid experience ID" });
        }

        const experience = await Experience.findById(id);
        if (!experience) {
            return res.status(404).json({ message: "Experience not found" });
        }

        const slots = await Slot.find({
            experienceId: id,
            date: { $gte: new Date() } 
        }).sort('date');

        res.status(200).json({ experience, slots });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};