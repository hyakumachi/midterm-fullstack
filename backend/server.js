const express = require("express");
const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.get("/ratatouille", async (req, res) => {
  try {
    const response = await fetch("https://dog.ceo/api/breeds/image/random");  //placeholder url
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});