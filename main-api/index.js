require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const authRouter = require("./routes/auth");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.DB_STRING, () => {
	console.log("connected to db");
});

// routes
app.use("/auth", authRouter);

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`server live on port ${PORT}`));
