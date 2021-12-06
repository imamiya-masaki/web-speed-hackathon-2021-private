const { PostFauna } = require('./models/Post');

console.log('PostFauna', PostFauna)
const test = PostFauna.bulkCreate({
    "id": "01EXS42GYM0WGGKJBCS3DB05",
    "createdAt": "2021-02-05T12:53:42.320Z",
    "text": "このアニメ、タイトルなんだっけ...懐かしい気がするんだけど...",
    "userId": "d28aefa3-8e81-4a8a-b91d-699e31861eb3",
    "movieId": "b3998a47-ee87-483e-acf1-8e5b69c8527a"
  });

  console.log('test', test)