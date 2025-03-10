const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/Profile");
const requestRouter = require("./routes/connectionRequest");
const userRouter = require("./routes/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
connectDB()
  .then(() => {
    console.log("Database connection established...");
    const HOST = "0.0.0.0"; // Allows access from any network device
    app.listen(3000, HOST ,() => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected!", err);
  });

// Handle unexpected errors
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Promise Rejection:", err);
  process.exit(1);
});
