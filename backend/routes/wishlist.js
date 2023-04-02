const Wishlist = require("../models/Wishlist");
const { verifyToken, verifyTokenAndAuthorization } = require("./verifyToken");

const router = require("express").Router();

router.post("/", verifyToken, async (req, res) => {
  const newWishlist = new Wishlist(req.body);

  try {
    const savedWishlist = await newWishlist.save();
    res.status(200).json(savedWishlist);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Wishlist.findOneAndDelete({ productId: req.params.id });
    res.status(200).json("wishlist has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const wishlists = await Wishlist.find({ userId: req.params.userId });
    res.status(200).json(wishlists);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
