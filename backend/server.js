const express = require("express");
const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Dog API Backend!" });
});

app.get("/dog/random", async (req, res) => {
  try {
    const response = await fetch("https://dog.ceo/api/breeds/image/random");
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch random dog" });
  }
});

app.get("/dog/random/:count", async (req, res) => {
  const { count } = req.params;
  try {
    const response = await fetch(
      `https://dog.ceo/api/breeds/image/random/${count}`
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch multiple dogs" });
  }
});

app.get("/dog/breeds/all", async (req, res) => {
  try {
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch breeds list" });
  }
});

app.get("/dog/breed/:breed", async (req, res) => {
  const { breed } = req.params;
  try {
    const response = await fetch(
      `https://dog.ceo/api/breed/${encodeURIComponent(breed)}/images`
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch breed images" });
  }
});

app.get("/dog/breed/:breed/list", async (req, res) => {
  const { breed } = req.params;
  try {
    const response = await fetch(
      `https://dog.ceo/api/breed/${encodeURIComponent(breed)}/list`
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch sub-breeds" });
  }
});

app.get("/dog/breed/:breed/:subbreed", async (req, res) => {
  const { breed, subbreed } = req.params;
  try {
    const response = await fetch(
      `https://dog.ceo/api/breed/${encodeURIComponent(
        breed
      )}/${encodeURIComponent(subbreed)}/images`
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch sub-breed images" });
  }
});

app.listen(3001, () => {
  console.log("Server is running on http://localhost:3001");
});
