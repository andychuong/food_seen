//Controller posts_tags
const model = require('../models/posts_tags')

const getAll = (req, res, next) => {
  return model.getAll()
    .then((posts_tags) => {
      res.status(200).json(posts_tags)
    })
}

const getPostFromTag = (req, res, next) => {
  return model.getPostFromTag(req.params.id)
    .then((data) => {
      console.log('controller call:',
        data)
      res.status(200).json(data)
    })
}

//works!
const create = (req, res, next) => {
  return model.create(req.body.tag_id, req.body.post_id)
    .catch(errors => {
      return next({
        status: 400,
        message: `Could not create new post_tag object`,
        errors: errors
      })
    })
    .then(data => {
      res.status(201).json(data)
    })
}




module.exports = { getAll, getPostFromTag, create }