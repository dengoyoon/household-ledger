import express from "express";
import cors from "cors";
import root from "./router/root.js";
const app = express();
const port = 3000;

app.use(cors());

app.use("/root", root);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

// var express = require('express');
// var router = express.Router();

// router.use(function(req, res, next) {
//   next();
// });

// router.get('/', function(req, res) {
//   res.send('hi1');
// });

// router.get('/about', function(req, res) {
//   res.send('hi2');
// });

// module.exports = router;

// var express = require('express');
// var app = express();
// var router_1 = require('./router/router_1');

// app.use('/aboutrouter',router_1);

// app.listen(3000, () => {
//   console.log('listen t0 3000')
// })
