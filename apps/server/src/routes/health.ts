import express from "express";
import mongoose from "mongoose";

const router = express.Router();

router.get("/health", async (_req, res) => {
    try {
        const db = mongoose.connection.db;

        if (mongoose.connection.readyState !== 1 || !db) {
            res.status(503).json({ status: "unavailable", mongodb: "disconnected" });
            return;
        }

        await db.command({ ping: 1 });
        res.status(200).json({ status: "ok", mongodb: "connected" });
    } catch {
        res.status(503).json({ status: "unavailable", mongodb: "unreachable" });
    }
});

export const HealthRoutes = router;
