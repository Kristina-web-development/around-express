const Card = require("../models/card");

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(500).send({ message: "Error" }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => res.status(500).send({ message: "Error" }));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(() => {
      const error = new Error("Card is not found");
      error.status = 404;
      throw error;
    })
    .then(() => res.status(200).send({ message: "Card is deleted" }))
    .catch((err) => {
      console.log(err);
      if (err.name === "CastError") {
        res.status(500).send({ message: "Please check card ID" });
      }
      if (err.status === 404) {
        res.status(404).send({ message: "Card not found" });
      }
    });
};

module.exports.likeCard = (req, res) => {
  console.log(req.params.cardId);

  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail((err) => {
      res.status(400).send({ message: "Card not found" });
    })
    .then((card) => res.status(200).send({ card }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.unlikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail((err) => {
      res.status(400).send({ message: "Card not found" });
    })
    .then((card) => res.status(200).send({ card }));
};
