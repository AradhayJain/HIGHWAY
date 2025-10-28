import { PromoCode } from '../models/promoCode.model.js';

/**
 * @desc    Validate a promo code
 * @route   POST /api/promo/validate
 * @access  Public
 */
export const validatePromoCode = async (req, res) => {
    try {
        const { code } = req.body;

        if (!code) {
            return res.status(400).json({ message: "Promo code is required" });
        }

        const promo = await PromoCode.findOne({ code: code.toUpperCase() });

        if (!promo) {
            // Return 200 OK, but with valid: false. The request was valid.
            return res.status(200).json({ valid: false, message: "Invalid promo code" });
        }

        // Found and valid
        res.status(200).json({
            valid: true,
            code: promo.code,
            discountType: promo.discountType,
            value: promo.value
        });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};