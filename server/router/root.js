import express from "express";
import db from "../db.js";
const router = express.Router();

router.get("/", (req, res) => {
    db.find({}, (err, docs) => {
        res.send({
            isSuccess: true,
            result: docs,
        });
    });
});

export default router;
