const express = require("express");

const connectDB = require("./config/database");

const app = express();

const User = require("./models/user");

app.use(express.json());

//signup api
app.post("/signup", async (req, res) => {
  // creating a new instance of a user model
  const user = new User(req.body);
  try {
    await user.save();
    res.send("user added  successfully");
  } catch (err) {
    res.status(400).send("error saving user " + err.massage);
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
  const userId = req.params?.userId
  const data = req.body;

  const AllOWED_UPDATES = [
    "photUrl",
    "about",
    "gender",
    "age",
    "skills"
  ];

  const isUpdateAllowed = Object.keys(data).every((k) =>
    AllOWED_UPDATES.includes(k)
  );

  if(!isUpdateAllowed){
    throw new Error("update not allowed")
  }

  try {
    const users = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });
    res.send(users);
  } catch (err) {
    res.status(400).send("Upadate Failed" + err.massage);
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
