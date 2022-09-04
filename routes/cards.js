const fsPromises = require('fs').promises;
const path = require('path');
const router = require('express').Router();

router.get('/cards', (req, res) => {
  const cardsPath = path.join(__dirname, '../data/cards.json');

  fsPromises
    .readFile(cardsPath, { encoding: 'utf-8' })
    .then((cards) => {
      res.send({ data: JSON.parse(cards) });
    })
    .catch(() => {
      res.status(500).send({ message: 'An error has occurred on the server' });
    });
});

module.exports = router;
