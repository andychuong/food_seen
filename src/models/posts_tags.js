//Model
const knex = require('../../knex')
const postsModel = require('../models/posts')
const tagsModel = require('../models/tags')

const getAll = (limit) => {
  return knex('posts_tags')
    .then(data => data)
    .catch(err => Promise.reject(err))
}

const create = (tag_id, post_id) => {
  let bodyData = {
    tag_id,
    post_id
  }
  return knex('posts_tags')
    .insert(bodyData)
    .returning('*')
    .then(data => data[0])
    .catch(err => {
      console.log(`${err}`)
    })
}

const getPostFromTag = (id) => {
  let postId
  return knex('posts_tags')
    .select('post_id')
    .where('tag_id', id)
    .then(postIds => {
      postId = postIds[0].post_id
      return postsModel.getOnePost(postId)
    })
    .catch((err) => {
      console.log(`error: ${err}`)
    })
}

module.exports = {
  getAll,
  getPostFromTag,
  create
}