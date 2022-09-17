const User = require('../models/user');

// all users
module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(500).send({ message: 'Error' }));
};

// the getUser request handler
module.exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: 'Error' }));
};

// the createUser request handler
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: 'Error' }));
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;

  if (!name || !about) {
    res.status(400).send({ message: 'Missing required parameter' });
  }

  User.findByIdAndUpdate(req.user._id, { name, about })
    .then((user) => {
      if (user) {
        res.status(200).send({ user });
      } else {
        res.status(404).send({ message: 'User not found' });
      }
    })
    .catch((err) => res.status(500).send({ message: 'Error' }));
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  if (!avatar) {
    res.status(400).send({ message: 'Avatar link was not provided' });
  }

  User.findByIdAndUpdate(req.user._id, { avatar })
    .then((user) => {
      if (user) {
        res.status(200).send({ user });
      } else {
        res.status(404).send({ message: 'User not found' });
      }
    })
    .catch((err) => res.status(500).send({ message: 'Error' }));
};
