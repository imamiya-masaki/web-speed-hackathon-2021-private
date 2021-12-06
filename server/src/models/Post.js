// import { DataTypes } from 'sequelize';
// import { ulid } from 'ulid';

// import { sequelize } from '../sequelize';
// import { faunaDB, q } from '../faunadb.js';
// const {faunaDB, q} = require("../faunadb.js");
const faunadb = require('faunadb');
/**
 * @typedef {object} PostAttributes
 * @property {string} id
 * @property {string} userId
 * @property {string} text
 */

/**
 * @typedef {import('sequelize').Model<PostAttributes>} PostModel
 */

/** @type {import('sequelize').ModelCtor<PostModel>} */
// const Post = sequelize.define(
//   'Post',
//   {
//     id: {
//       allowNull: false,
//       defaultValue: () => ulid(),
//       primaryKey: true,
//       type: DataTypes.STRING,
//     },
//     text: {
//       allowNull: false,
//       type: DataTypes.STRING,
//     },
//   },
//   {
//     defaultScope: {
//       attributes: {
//         exclude: ['userId', 'movieId', 'soundId'],
//       },
//       include: [
//         {
//           association: 'user',
//           attributes: { exclude: ['profileImageId'] },
//           include: { association: 'profileImage' },
//         },
//         {
//           association: 'images',
//           through: { attributes: [] },
//         },
//         { association: 'movie' },
//         { association: 'sound' },
//       ],
//     },
//   },
// );

exports.PostFauna = {
  bulkCreate: function (data) {
    const faunaDB = new faunadb.Client({
      secret: "fnAEZyvbtUACQaeESU7qAQo6MhRExcL5YCgiBFLL"
    })
    console.log('data', data);
    faunaDB.query(faunadb.query.Create('posts', {data: data}))
    .then((res) => {
      return {
        statusCode: 200,
        body: JSON.stringify(res)
      }
    })
    .catch((err) => {
      console.log('error', err)
      return {
        statusCode: 400,
        body: JSON.stringify(err)
      }
    })
  }
}

// exports { Post, PostFauna };
