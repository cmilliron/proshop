import express from "express";
import products from "./data/products.js";
import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT || 5500;

const app = express();

app.get("/", (req, res) => {
  res.send("API is running");
});

app.get("/api/products", (req, res) => {
  console.log("Request for products made.");
  res.json(products);
});

app.get("/api/product/:id", (req, res) => {
  console.log("Request for specific Product was made.");
  const id = req.params.id;
  const product = products.find((p) => p._id === id);
  res.json(product);
});

app.listen(port, () =>
  console.log(`Server running in ${process.env.NODE_ENV} on port ${port}`)
);
