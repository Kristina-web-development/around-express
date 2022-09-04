const fsPromises = require('fs').promises;
const path = require('path');
const router = require('express').Router();

router.get('/users/:id', (req, res) => {
  const { id } = req.params;
  const usersPath = path.join(__dirname, '../data/users.json');

  fsPromises
    .readFile(usersPath, { encoding: 'utf-8' })
    .then((users) => {
      const data = JSON.parse(users);
      const userFound = data.find((user) => user._id === id);

      if (!userFound) {
        res.status(404).send({ message: 'User id not found' });
      } else {
        res.send(userFound);
      }
    })
    .catch(() => {
      res.status(500).send({ message: 'An error has occurred on the server' });
    });
});

router.get('/users', (req, res) => {
  const usersPath = path.join(__dirname, '../data/users.json');
  fsPromises
    .readFile(usersPath, { encoding: 'utf-8' })
    .then((users) => {
      res.send({ data: JSON.parse(users) });
    })
    .catch(() => {
      res.status(500).send({ message: 'An error has occurred on the server' });
    });
});

module.exports = router;
