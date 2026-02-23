const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const USER = { email: "appweb@udv.edu.gt", password: "123456" };

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;

  if (email === USER.email && password === USER.password) {
    return res.json({
      ok: true,
      token: "fake-token",
      user: { email }
    });
  }

  return res.status(401).json({
    ok: false,
    message: "Credenciales incorrectas"
  });
});

app.listen(3000, () => console.log("Backend running on http://localhost:3000"));