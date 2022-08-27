const fs = require("fs");
const path = require("path");
const router = require("express").Router();

router.get("/cards", (req, res) => {
  const cardsPath = path.join(__dirname, "../data/cards.json");

  fs.readFile(cardsPath, { encoding: "utf-8" }, (err, data) => {
    if (err) {
      console.log(err);
    }

    if (data) {
      res.send(data);
    }
  });
});

module.exports = router;
