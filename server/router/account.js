import express from "express";
import db from "../db.js";

const router = express.Router();

router.post("/", (req, res) => {
    const body = req.body;
    db.insert(body);
    res.send({
        isSuccess: true,
        insertData: body,
    });
});

export default router;
