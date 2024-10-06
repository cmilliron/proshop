import express from "express";
const router = express.Router();

import products from "../data/products.js";

router.get("/", (req, res) => {
  console.log("Request for products made.");
  res.json(products);
});

router.get("/:id", (req, res) => {
  console.log("Request for specific Product was made.");
  const id = req.params.id;
  const product = products.find((p) => p._id === id);
  res.json(product);
});

export default router;
