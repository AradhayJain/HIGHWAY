import mongoose from 'mongoose';
const { Schema } = mongoose;

const slotSchema = new mongoose.Schema({
    experienceId: {
        type: Schema.Types.ObjectId,
        ref: 'Experience',
        required: true,
        index: true // Indexing for faster queries by experience
    },
    date: {
        type: Date,
        required: true
    },
    startTime: {
        type: String, // e.g., "10:00 AM"
        required: true
    },
    totalCapacity: {
        type: Number,
        required: true,
        min: 1
    },
    bookedCount: {
        type: Number,
        default: 0,
        min: 0,
        // Custom validation to ensure bookedCount never exceeds totalCapacity
        validate: {
            validator: function(value) {
                // 'this' refers to the document being validated
                return value <= this.totalCapacity;
            },
            message: 'Booked count cannot exceed total capacity.'
        }
    }
}, { timestamps: true });

export const Slot = mongoose.model('Slot', slotSchema);