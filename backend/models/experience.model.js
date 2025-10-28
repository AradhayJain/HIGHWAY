import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    location: {
        type: String,
        trim: true
    },
    images: [{
        type: String // Expecting URLs
    }]
}, { timestamps: true });

export const Experience = mongoose.model('Experience', experienceSchema);