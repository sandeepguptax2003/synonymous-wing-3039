const fetchuser = (req, res, next) => {
  const token = req.headers.token;
  if (!token) {
    return res
      .status(401)
      .json("You are not Authenticated Please Authenticate Yourself!");
  }
  try {
    const data = jwt.verify(token, JWT_SECRET_KEY);
    req.user = data.id;
    next();
  } catch (error) {
    res
      .status(401)
      .json("You are not Authenticated Please Authenticate Yourself!");
  }
};

module.exports = fetchuser;
