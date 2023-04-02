const User = require("../models/User");
const fetchuser = require("./fetchuser");
const { verifyToken, verifyTokenAndAuthorization } = require("./verifyToken");
const router = require("express").Router();

router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString();
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deletd");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/getuser", fetchuser, async (req, res) => {
  try {
    userId = req.user;
    const user = await User.findById(userId).select("-password");

    res.send(user);
  } catch (err) {
    res.status(500).send("Internal Server Isues");
  }
});

module.exports = router;
