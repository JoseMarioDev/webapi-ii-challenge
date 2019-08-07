const express = require('express');
const server = express();

const postsRouter = require('./routes/postsRouter');

server.use(express.json());
server.use('/api/posts', postsRouter);

server.get('/', (req, res) => {
  const queryParameters = req.query;
  res
    .status(200)
    .json({ message: 'query parameters working', queryParameters });
});

server.listen(8000, () => console.log('port running on 8000'));
