import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./utils/db.js";

// Import your routes
import experienceRoutes from './routes/experience.routes.js';
import bookingRoutes from './routes/booking.routes.js';
import promoRoutes from './routes/promo.routes.js';
import slotRoutes from './routes/slot.routes.js';

// Load environment variables FIRST
dotenv.config({});

const app = express();
const PORT = process.env.PORT || 3000;

// CORS options
const corsOptions = {
    origin: "*", // For development. For production, restrict this.
    methods: "GET,PUT,POST,DELETE",
    credentials: true
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json()); // To parse JSON bodies
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded bodies

// API Routes
app.use('/api/experiences', experienceRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/promo', promoRoutes);
app.use('/api/slots', slotRoutes);

// Health check route
app.get("/", (req, res) => {
    res.status(200).json({ message: "Booklt API is running!" });
});

// Start server function
const startServer = async () => {
    try {
        // Connect to the database first
        await connectDB();
        console.log("MongoDB connected successfully.");
        
        // Then start listening for requests
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        process.exit(1); // Exit process with failure
    }
};

// Run the server
startServer();