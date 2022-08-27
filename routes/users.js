const fs = require("fs");
const path = require("path");
const router = require("express").Router();

router.get("/users/:id", (req, res) => {
  const requestParams = req.params;
  const usersPath = path.join(__dirname, "../data/users.json");
  fs.readFile(usersPath, { encoding: "utf-8" }, (err, data) => {
    if (err) {
      res.send(err);
    }

    if (data && requestParams.id) {
      const users = JSON.parse(data);
      const userFound = users.find((user) => user["_id"] === requestParams.id);
      if (userFound) {
        res.send(userFound);
      } else {
        res.send("User not found");
      }
    }
  });
});

router.get("/users", (req, res) => {
  fs.readFile("data/users.json", { encoding: "utf-8" }, (err, data) => {
    if (err) {
      console.log(err);
    }

    if (data) {
      console.log(data);
      res.send(data);
    } else {
      res.send("No users");
    }
  });
});

module.exports = router;
