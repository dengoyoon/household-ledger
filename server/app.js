import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import root from "./router/root.js";
import account from "./router/account.js";

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.use("/", root);
app.use("/account", account);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
