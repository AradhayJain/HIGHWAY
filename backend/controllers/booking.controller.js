import { Booking } from '../models/booking.model.js';
import { Slot } from '../models/slot.model.js';
import mongoose from 'mongoose';

/**
 * @desc    Create a new booking
 * @route   POST /api/bookings
 * @access  Public
 */
export const createBooking = async (req, res) => {
    const { slotId, userName, userEmail, pricePaid, promoCode } = req.body;

    // 1. Basic input validation
    if (!slotId || !userName || !userEmail || !pricePaid) {
        return res.status(400).json({ message: "Missing required fields" });
    }
    
    if (!mongoose.Types.ObjectId.isValid(slotId)) {
        return res.status(400).json({ message: "Invalid slot ID" });
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // 2. Find the slot and lock it for the transaction
        const slot = await Slot.findById(slotId).session(session);

        if (!slot) {
            throw new Error("Slot not found.");
        }

        // 3. Check availability (the critical atomic check)
        if (slot.bookedCount >= slot.totalCapacity) {
            throw new Error("This slot is already sold out.");
        }

        // 4. Update the slot
        slot.bookedCount += 1;
        await slot.save({ session }); // Save the change within the transaction

        // 5. Create the booking
        const newBooking = new Booking({
            experienceId: slot.experienceId,
            slotId: slot._id,
            userName,
            userEmail,
            pricePaid,
            promoCode
        });
        await newBooking.save({ session }); // Save the new booking

        // 6. Commit the transaction
        await session.commitTransaction();
        
        res.status(201).json({ 
            message: "Booking successful!", 
            booking: newBooking 
        });

    } catch (error) {
        // 7. If anything fails, abort the transaction
        await session.abortTransaction();
        
        // Send specific errors
        if (error.message.includes("sold out") || error.message.includes("Slot not found")) {
            return res.status(400).json({ message: error.message });
        }
        
        // Send general server error
        res.status(500).json({ message: "Booking failed", error: error.message });
    } finally {
        // 8. Always end the session
        session.endSession();
    }
};