const errorHandler = (error, res) => {
  console.error('Error: ', error);
  res.status(500).send({ error });
};

module.exports = errorHandler;
