const fsPromises = require("fs").promises;
const path = require("path");
const router = require("express").Router();

router.get("/users/:id", (req, res) => {
  const requestParams = req.params;
  const usersPath = path.join(__dirname, "../data/users.json");

  fsPromises.readFile(usersPath, { encoding: "utf-8" }).then((data, err) => {

    if (err) {
      res.status(500).send({message: "Can't find users"});
    }

    if (data && requestParams.id) {
      const users = JSON.parse(data);
      const userFound = users.find((user) => user["_id"] === requestParams.id);
      if (userFound) {
        res.status(200).send(userFound);
      } else {
        res.status(404).send({message: "User not found"});
      }
    }

  });
});

router.get("/users", (req, res) => {
  const usersPath = path.join(__dirname, "../data/users.json");
  fsPromises.readFile(usersPath, { encoding: "utf-8" }).then((data, err) => {
    if (err) {
      res.status(500).send({ message: "Users not found" });
    }

    if (data) {
      res.send(JSON.parse(data));
    } else {
      res.status(404).send({message: "No users"});
    }
  });
});

module.exports = router;
