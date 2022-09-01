const fsPromises = require("fs").promises;
const path = require("path");
const router = require("express").Router();

router.get("/cards", (req, res) => {
  const cardsPath = path.join(__dirname, "../data/cards.json");

  fsPromises.readFile(cardsPath, { encoding: "utf-8" }).then((data, err) => {

    if (err) {
      res.status(500).send({ message: "Cards not found" });
    }

    if (data) {
      res.send(JSON.parse(data));
    }
  });
});

module.exports = router;
