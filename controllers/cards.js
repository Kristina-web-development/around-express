const Card = require('../models/card');
const { SERVER_ERROR, BAD_REQUEST, NOT_FOUND } = require('../utils/constants');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(SERVER_ERROR).send({ message: 'Server error' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(BAD_REQUEST)
          .send({ message: 'User link or name is incorrect' });
      } else {
        res.status(SERVER_ERROR).send({ message: 'Server error' });
      }
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail(() => {
      const error = new Error('Card is not found');
      error.status = NOT_FOUND;
      throw error;
    })
    .then(() => res.send({ message: 'Card is deleted' }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: 'Please check card ID' });
      }
      if (err.status === 404) {
        res.status(NOT_FOUND).send({ message: 'Card not found' });
      }
      res.status(SERVER_ERROR).send({ message: 'Server error' });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .orFail((err) => {
      res.status(NOT_FOUND).send({ message: 'Card not found' });
    })
    .then((card) => res.send({ card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: 'Check card id' });
      }
      if (err.name === 'NotFound') {
        res.status(NOT_FOUND).send({ message: 'Card not found' });
      }
      res.status(SERVER_ERROR).send({ message: 'Server error' });
    });
};

module.exports.unlikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .orFail((err) => {
      res.status(NOT_FOUND).send({ message: 'Card not found' });
    })
    .then((card) => res.send({ card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: 'Check card id' });
      }
      if (err.name === 'NotFound') {
        res.status(NOT_FOUND).send({ message: 'Card not found' });
      }
      res.status(SERVER_ERROR).send({ message: 'Server error' });
    });
};
