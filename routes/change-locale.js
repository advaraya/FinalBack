const express = require("express");
const router = express.Router();

router.get("/:locale", (req, res, next) => {
  const locale = req.params.locale;

  const volverA = req.get("referrer");

  res.cookie("cookie-login", locale, { maxAge: 1000 * 60 * 60 * 24 * 20 });

  res.redirect(volverA);
});

module.exports = router;
