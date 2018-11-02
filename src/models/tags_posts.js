//Model
const knex = require('../../knex')
const postsModel = require('../models/posts')
const tagsModel = require('../models/tags')

const getTagsFromPost = (id) => {
  let tags = []
  return knex('posts_tags')
    .select('tag_id')
    .where('post_id', id)
    .then(tagIds => {
      // console.log(`tagIds`, tagIds)
      for (var i = 0; i < tagIds.length; i++) {
        tags.push(tagIds[i].tag_id)
      }
      // console.log('tags arr:', tags)
      return Promise.all(tags.map(id => {
        return tagsModel.getOneTag(id)
      }))
    })
    .catch((err) => {
      console.log(`error: ${err}`)
    })
}

const getAll = () => {
  return knex('tags_posts')
    .then(posts => {
      return posts
    })
    .catch(err => Promise.reject(err))
}

module.exports = { getTagsFromPost, getAll }