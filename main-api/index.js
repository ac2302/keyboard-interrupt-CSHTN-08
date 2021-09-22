require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const authMiddleware = require("./middlewares/auth");
const authOnly = require("./middlewares/authOnly");

const authRouter = require("./routes/auth");
const module_adminRouter = require("./routes/module-admin");
const completeRouter = require("./routes/complete");
const commentRouter = require("./routes/comment");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(authMiddleware);

mongoose.connect(process.env.DB_STRING, () => {
	console.log("connected to db");
});

// routes
app.use("/auth", authRouter);
app.use("/module-admin", module_adminRouter);
app.use("/complete", completeRouter);
app.use("/comment", commentRouter);

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`server live on port ${PORT}`));
