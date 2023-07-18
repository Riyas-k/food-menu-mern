const jwt = require("jsonwebtoken");
module.exports = {
  user: (req, res, next) => {
    const authHeader = req.headers["x-access-token"];
    const token = authHeader && authHeader.split(" ")[0];

    if (token === null) {
      return res.json({ status: false });
    }
    jwt.verify(token, "secret123", (err, user) => {
      if (err) {
        return res.json({ status: false });
      }
      req.user = user;

      next();
    });
  },
};
