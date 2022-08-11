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

router.get("/date", (req, res) => {
    const date = req.query.date;
    db.find({ date: date }, (err, docs) => {
        res.send({
            isSuccess: true,
            result: docs,
        });
    });
});

router.get("/month", (req, res) => {
    const yearMonth = req.query.yearMonth;

    db.find({ date: { $regex: new RegExp(`${yearMonth}.*`) } }, (err, docs) => {
        res.send({
            isSuccess: true,
            result: docs,
        });
    });
});

export default router;
