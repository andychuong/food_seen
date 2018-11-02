//Controller
const model = require('../models/tags_posts')

const getTagsFromPost = (req, res, next) => {
  return model.getTagsFromPost(req.params.id)
    .then((data) => {
      res.status(200).json(data)
    })
}

const getAll = (req, res, next) => {
  return model.getAll()
    .then((tags_posts) => {
      res.status(200).json(posts_tags)
    })
}

module.exports = { getTagsFromPost, getAll }