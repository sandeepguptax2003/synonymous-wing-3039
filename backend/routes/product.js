const Product = require("../models/Product");
const { verifyToken } = require("./verifyToken");

const router = require("express").Router();

//post a product
//localhost:8080/products/
router.post("/", verifyToken, async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//put/update a product
//localhost:8080/products/id
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete a product
//localhost:8080/products/id
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//find a product
//localhost:8080/products/find/id
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get product
//localhost:8080/products/
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  const qproduct_type = req.query.product_type;
  try {
    let products;

    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(5);
    } else if (qCategory) {
      products = await Product.find({ category: qCategory });
    } else if (qproduct_type) {
      const {
        page = 1,
        limit = 10,
        orderBy = "price",
        order = "asc",
      } = req.query;
      products = await Product.find({ product_type: qproduct_type })
        .sort({ [orderBy]: order === "asc" ? 1 : -1 })
        .skip((page - 1) * limit)
        .limit(limit);
    } else {
      const {
        page = 1,
        limit = 10,
        orderBy = "price",
        order = "asc",
      } = req.query;
      products = await Product.find()
        .sort({
          [orderBy === "price" ? Number(orderBy) : orderBy]:
            order === "asc" ? 1 : -1,
        })
        .skip((page - 1) * limit)
        .limit(limit);
    }
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
