const express = require('express');

const router = express.Router();
const Posts = require('../data/db');

// _______________________________________________________________________________

router.post('/', (req, res) => {
  const newPost = req.body;
  const { title, contents } = newPost;
  if (!title || !contents) {
    res.status(400).json({
      errorMessage: 'Please provide title and contents for the post.',
    });
  }
  Posts.insert(newPost)
    .then(post => {
      res.status(201).json(post);
      console.log(post);
    })
    .catch(err => {
      res.status(500).json({
        error: 'There was an error while saving the post to the database',
      });
    });
});

// _______________________________________________________________________________

router.post('/:id/comments', (req, res) => {
  const postId = req.params.id;
  const { text } = req.body;
  posts
    .findById(postId)
    .first()
    .then(post => {
      if (!post) {
        return res
          .status(404)
          .json({ message: 'The post with the specified ID does not exist.' });
      } else {
        if (!text) {
          res
            .status(400)
            .json({ errorMessage: 'Please provide text for the comment.' });
        } else {
          posts.insertComment(req.body);
          return then(comment => {
            res.status(201).json(comment);
          });
        }
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: 'The post information could not be retrieved.' });
    });
});

// _______________________________________________________________________________

router.get('/', (req, res) => {
  Posts.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: 'The posts information could not be retrieved.' });
    });
});

// _______________________________________________________________________________

router.get('/:id', (req, res) => {
  const postId = req.params.id;
  posts
    .findById(postId)
    .first()
    .then(post => {
      if (!post) {
        return res
          .status(404)
          .json({ message: 'The post with the specified ID does not exist.' });
      } else {
        res.status(200).json(post);
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: 'The post information could not be retrieved.' });
    });
});

// _______________________________________________________________________________

router.get('/:id/comments', (req, res) => {
  const postId = req.params.id;
  posts
    .findPostComments(postId)
    .then(post => {
      if (postId > post) {
        return res
          .status(404)
          .json({ message: 'The post with the specified ID does not exist.' });
      } else {
        res.status(200).json(post);
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: 'The comments information could not be retrieved.' });
    });
});

// _______________________________________________________________________________

router.delete('/:id', (req, res) => {
  const postId = req.params.id;
  posts
    .remove(postId)
    .then(post => {
      if (!post) {
        res
          .status(404)
          .json({ message: 'The post with the specified ID does not exist.' });
      } else {
        res.status(200).json({ message: 'Gone', post });
      }
    })
    .catch(err => {
      res.catch(500).json({ error: 'The post could not be removed' });
    });
});

// _______________________________________________________________________________

router.put('/:id', (req, res) => {
  const postId = req.params.id;
  const updatedPost = req.body;
  const { title, contents } = updatedPost;

  posts
    .update(postId, updatedPost)
    .then(updated => {
      if (!updated) {
        res.status(404).json({
          message: 'The post with the specified ID does not exist.',
          updated,
        });
      } else {
        if (!title || !contents) {
          res.status(400).json({
            errorMessage: 'Please provide title and contents for the post.',
          });
        } else {
          res.status(200).json({ message: 'OK' });
        }
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: 'The post information could not be modified.' });
    });
});

// _______________________________________________________________________________

module.exports = router;
