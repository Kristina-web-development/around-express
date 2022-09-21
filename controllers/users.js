const User = require('../models/user');
const { NOT_FOUND, SERVER_ERROR, BAD_REQUEST } = require('../utils/constants');
// all users
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(SERVER_ERROR).send({ message: 'Server error' }));
};

// the getUser request handler
module.exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(SERVER_ERROR).send({ message: 'Server error' }));
};

// the createUser request handler
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: 'User data is invalid' });
      }
      res.status(SERVER_ERROR).send({ message: 'Server error' });
    });
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;

  if (!name || !about) {
    res.status(BAD_REQUEST).send({ message: 'Missing required parameter' });
  }

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail((err) => {
      if (err.name === 'NotFound') {
        res.status(NOT_FOUND).send({ message: 'User not found' });
      }
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: 'Check user id' });
      }
      res.status(SERVER_ERROR).send({ message: 'Server error' });
    })
    .then((user) => res.status(200).send({ user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: 'Check user data' });
      }
      if (err.name === 'NotFound') {
        res.status(NOT_FOUND).send({ message: 'User not found' });
      }
      res.status(SERVER_ERROR).send({ message: 'Server error' });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  if (!avatar) {
    res.status(BAD_REQUEST).send({ message: 'Check avatar link' });
  }

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .orFail((err) => {
      if (err.name === 'NotFound') {
        res.status(NOT_FOUND).send({ message: 'User not found' });
      }
      if (err.name === 'CastError') {
        res.status(BAD_REQUEST).send({ message: 'Check user id' });
      }
      res.status(SERVER_ERROR).send({ message: 'Server error' });
    })
    .then((user) => res.status(200).send({ user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: 'Check user data' });
      }
      if (err.name === 'NotFound') {
        res.status(NOT_FOUND).send({ message: 'User not found' });
      }
      res.status(SERVER_ERROR).send({ message: 'Server error' });
    });
};
