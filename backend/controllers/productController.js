import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

// @desc    Fetch all products
// @route   GET /api/proudcts
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});

  res.json(products);
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  console.log("Request for specific Product was made.");
  const id = req.params.id;
  const product = await Product.findById(id);
  //   const product = products.find((p) => p._id === id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
  res.status(404).json({ message: "Product not found." });
});

export { getProducts, getProductById };
