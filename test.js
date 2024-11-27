const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();

const secretKey = "secretkey";

app.use(express.json()); // Parse JSON payloads

app.get("/", (req, res) => {
  res.json({
    message: "Testing API",
  });
});

app.post("/login", (req, res) => {
  const user = {
    id: 1,
    name: "Pawan",
    email: "test@gmail.com",
  };
  jwt.sign({ user }, secretKey, { expiresIn: "300s" }, (err, token) => {
    if (err) {
      console.error("Error generating token:", err);
      return res.status(500).json({ error: "Token generation failed" });
    }
    res.json({ token });
  });
});

app.post("/profile", verifyToken, (req, res) => {
  jwt.verify(req.token, secretKey, (err, authData) => {
    if (err) {
      console.error("JWT Error:", err);
      return res.status(403).json({ result: "Invalid or Expired Token" });
    }
    res.json({
      message: "Profile accessed",
      authData,
    });
  });
});

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    req.token = token;
    next(); // Proceed to the next middleware
    console.log("Authorization Header:", req.headers["authorization"]);
    console.log("Token Extracted:", req.token);
  } else {
    res.status(403).json({
      result: "Token not provided or malformed",
    });
  }
}

app.listen(5000, () => {
  console.log("App is running on http://localhost:5000");
});
