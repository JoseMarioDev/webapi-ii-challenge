const express = require('express');
const Posts = require('./data/db.js');
const server = express();
server.use(express.json());

server.listen(8000, () => console.log('port running on 8000'));
