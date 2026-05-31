require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      /\.vercel\.app$/,
    ],
    credentials: true,
  })
);

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
  });

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },

  password: {
    type: String,
    required: true,
    minlength: 8,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

function validateInputs({ username, email, password }) {
  if (!username || username.trim().length < 3) {
    return "Username must be at least 3 characters.";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !emailRegex.test(email)) {
    return "Please enter a valid email address.";
  }

  if (!password || password.length < 8) {
    return "Password must be at least 8 characters.";
  }

  return "";
}

app.post("/api/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const validationError = validateInputs({
      username,
      email,
      password,
    });

    if (validationError) {
      return res.status(400).json({
        error: validationError,
      });
    }

    const existingUser = await User.findOne({
      username,
    });

    if (existingUser) {
      return res.status(409).json({
        error: "Username already taken.",
      });
    }

    const hash = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hash,
    });

    const token = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return res.status(201).json({
      message: "User registered successfully.",
      user: {
        username: newUser.username,
        email: newUser.email,
      },
      token,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Server error.",
    });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const foundUser = await User.findOne({
      username,
    });

    const passwordMatches =
      foundUser &&
      (await bcrypt.compare(password, foundUser.password));

    if (!foundUser || !passwordMatches) {
      return res.status(401).json({
        error: "Invalid username or password.",
      });
    }

    const token = jwt.sign(
      { id: foundUser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return res.status(200).json({
      message: "Login successful.",
      user: {
        username: foundUser.username,
        email: foundUser.email,
      },
      token,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Server error.",
    });
  }
});

app.post("/api/logout", (req, res) => {
  const auth = req.headers.authorization;

  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({
      error: "Missing or invalid token.",
    });
  }

  const token = auth.split(" ")[1];

  try {
    jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    console.log("Logout allowed even with expired token.");
  }

  return res.status(200).json({
    message: "Logged out.",
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    time: new Date().toISOString(),
    mongo: mongoose.connection.readyState === 1,
  });
});

app.use((req, res) => {
  return res.status(404).json({
    error: "Route not found.",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});