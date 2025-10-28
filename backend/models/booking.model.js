import mongoose from 'mongoose';
const { Schema } = mongoose;

const bookingSchema = new mongoose.Schema({
    experienceId: {
        type: Schema.Types.ObjectId,
        ref: 'Experience',
        required: true
    },
    slotId: {
        type: Schema.Types.ObjectId,
        ref: 'Slot',
        required: true,
        index: true // Indexing for faster lookups by slot
    },
    userName: {
        type: String,
        required: true,
        trim: true
    },
    userEmail: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        // Basic email format validation
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    pricePaid: {
        type: Number,
        required: true
    },
    promoCode: {
        type: String,
        optional: true
    }
}, { timestamps: true });

export const Booking = mongoose.model('Booking', bookingSchema);