const express = require('express');

const cardsRoute = require('./routes/cards');
const userRoute = require('./routes/users');

const { PORT = 3000 } = process.env;
const app = express();

app.use(userRoute);
app.use(cardsRoute);

app.use('*', (req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
