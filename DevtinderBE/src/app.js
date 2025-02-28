const express = require("express");

const connectDB = require("./config/database");
const bcrypt = require("bcrypt");

const app = express();
const { userAuth } = require("./middlewares/auth");
const User = require("./models/user");
const { validateSignupData } = require("./utils/validations");
const cookieParser = require("cookie-Parser");
const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(cookieParser());

//signup api
app.post("/signup", async (req, res) => {
  // creating a new instance of a user model

  try {
    //validating the data
    validateSignupData(req);

    //encrypting the password
    //using npm i bcrypt
    const { firstName, lastName, emailId, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await user.save();
    res.send("user added  successfully");
  } catch (err) {
    res.status(400).send("error saving user " + err.message);
  }
});

//login api

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("invalid credentials");
    } else {
      const token = await user.getJWT()
      res.cookie("token", token);
      res.send("login successfull");
    }
  } catch (err) {
    res.status(400).send("error saving user " + err.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("error fetching user " + err.message);
  }
});

//get user by email
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    const users = await User.find({ emailId: userEmail });
    if (users.length === 0) {
      res.status(404).send("user not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

//feed api -get all the user from data base
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    if (!users) {
      res.send("user not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("feed data failed");
  }
});

//search using Email
app.get("/searchEmail", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const users = await User.find({ emailId: userEmail });
    if (!users) {
      res.status(400).send("user not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("feed data failed");
  }
});

//delteUser

app.delete("/user", async (req, res) => {
  const user = req.body._id;
  try {
    const users = await User.deleteOne({ _id: user });
    res.send(users);
  } catch (err) {
    res.status(400).send("connot delete user");
  }
});

//updateuser
app.patch("/user/userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  const AllOWED_UPDATES = ["photUrl", "about", "gender", "age", "skills"];

  const isUpdateAllowed = Object.keys(data).every((k) =>
    AllOWED_UPDATES.includes(k)
  );

  if (!isUpdateAllowed) {
    throw new Error("update not allowed");
  }

  try {
    const users = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });
    res.send(users);
  } catch (err) {
    res.status(400).send("Upadate Failed" + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected!");
  });
