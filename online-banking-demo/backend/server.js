const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = "demo-secret";
const demoUser = {
  email: "demo@bank.com",
  password: "Password123!",
  accounts: {
    balance: 4200,
    transactions: [
      { date: "2025-06-10", description: "Grocery", amount: -50 },
      { date: "2025-06-08", description: "Salary", amount: 2000 }
    ]
  }
};

app.post("/auth/login", (req, res) => {
  const { email, password } = req.body;
  if (email === demoUser.email && password === demoUser.password) {
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1h" });
    return res.json({ token });
  }
  res.status(401).json({ error: "Invalid credentials" });
});

app.get("/accounts", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).send("Missing auth");

  const token = authHeader.split(" ")[1];
  try {
    jwt.verify(token, JWT_SECRET);
    res.json(demoUser.accounts);
  } catch (err) {
    res.status(403).send("Invalid token");
  }
});

app.listen(3001, () => console.log("Backend running on port 3001"));