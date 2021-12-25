const fs = require('fs');
const users = require('./seeds/users.json');
const posts = require('./seeds/posts.json');
const comments = require('./seeds/comments.json');

const output = {};
output.users = {};
output.posts = {}; // 詳細
output.timeLine = {};
output.timeLine = { normal: '', bold: ''};
const userMap = {};
const commentMap = {};
const main = async () => {
  for (const user of users) {
    output.users[user.id] = {normal: '', bold: ''}
    userMap[user.id] = {};
    userMap[user.id].name = user.name
    userMap[user.id].username = user.username
    // timeLine
    output.timeLine.bold += user.name
    output.timeLine.normal += user.username
    output.users[user.id].bold += user.name
    output.users[user.id].normal += user.username
    output.users[user.id].normal += user.description
    output.users[user.id].normal +=  'からサービスを利用しています' //ユーザーページ
  }
  for (const comment of comments) {
    if (!commentMap[comment.postId]){
      commentMap[comment.postId] = {normal: '', bold: ''}
    }
    commentMap[comment.postId].normal += comment.text
    commentMap[comment.postId].normal += userMap[comment.userId].username
    commentMap[comment.postId].bold += userMap[comment.userId].name
  }
  for (const post of posts) {
    output.posts[post.id] = {normal: '', bold: ''}
    output.posts[post.id].normal += post.text
    output.posts[post.id].bold += userMap[post.userId].name
    output.posts[post.id].normal += userMap[post.userId].username
    // timeLine
    output.timeLine.normal += post.text
    // user
    output.users[post.userId].normal += post.text

    // commentのフォント追加
    output.posts[post.id].normal += commentMap[post.id].normal
    output.posts[post.id].bold += commentMap[post.id].bold
  }
  await fs.mkdirSync('fontTextOutput/', (err) => {console.error('err', err)})
  await fs.mkdirSync('fontTextOutput/users/', (err) => {console.error('err', err)})
  for (const userId of Object.keys(output.users)) {
    await fs.mkdirSync('fontTextOutput/users/' + userId, (err) => {console.error('err', err)});
    for (const [type,value] of Object.entries(output.users[userId])) {
      await fs.writeFile(`fontTextOutput/users/${userId}/${type}.txt`, value, (err) => {console.error('err', err)});
    }
  }
  await fs.mkdirSync('fontTextOutput/posts/', (err) => {console.error('err', err)})
  for (const postId of Object.keys(output.posts)) {
    await fs.mkdirSync('fontTextOutput/posts/' + postId, (err) => {console.error('err', err)});
    for (const [type,value] of Object.entries(output.posts[postId])) {
      await fs.writeFile(`fontTextOutput/posts/${postId}/${type}.txt`, value, (err) => {console.error('err', err)});
    }
  }
  await fs.mkdirSync('fontTextOutput/timeline/', (err) => {console.error('err', err)});
  for (const [type,value] of Object.entries(output.timeLine)) {
    await fs.writeFile(`fontTextOutput/timeline/${type}.txt`, value, (err) => {console.error('err', err)});
  }
}
main()