import mongoose from 'mongoose';

const promoCodeSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        uppercase: true // Standardize codes
    },
    discountType: {
        type: String,
        required: true,
        enum: ['percentage', 'flat'] // Restrict values
    },
    value: {
        type: Number,
        required: true,
        min: 0
    }
}, { timestamps: true });

export const PromoCode = mongoose.model('PromoCode', promoCodeSchema);