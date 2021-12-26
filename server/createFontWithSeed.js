const fs = require('fs');
const users = require('./seeds/users.json');
const posts = require('./seeds/posts.json');
const comments = require('./seeds/comments.json');
const sounds = require('./seeds/sounds.json');
/*
music:postId
01EX0SGMRHZP5JBA5JF2ZZQTP2
image:postId
01EXNV3BSJV18WFYBS87TP4NFC
movie:postId
01EXH20KRBVP34RYHYDTSX8JS2
*/
const output = {};
output.users = {};
output.posts = {}; // 詳細
output.timeLine = {};
output.timeLine = { normal: '', bold: ''};
output.postDetail = {normal: '', bold: ''};
output.targetUser = {normal: '', bold: ''};
const userMap = {};
const commentMap = {};
const soundMap = {};
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
    output.users[user.id].normal += '0123456789@-年月日'
    output.users[user.id].bold += '0123456789@-年月日'
  }
  output.timeLine.bold += '0123456789@-年月日'
  output.timeLine.normal += '0123456789@-年月日'
  for (const comment of comments) {
    if (!commentMap[comment.postId]){
      commentMap[comment.postId] = {normal: '', bold: ''}
    }
    commentMap[comment.postId].normal += comment.text
    commentMap[comment.postId].normal += userMap[comment.userId].username
    commentMap[comment.postId].bold += userMap[comment.userId].name
  }
  for (const sound of sounds) {
    soundMap[sound.id] = sound
  }
  for (const post of posts) {
    output.posts[post.id] = {normal: '', bold: ''}
    output.posts[post.id].normal += post.text
    output.posts[post.id].bold += userMap[post.userId].name
    output.posts[post.id].normal += userMap[post.userId].username
    output.posts[post.id].normal += '0123456789@-年月日'
    output.posts[post.id].bold += '0123456789@-年月日'
    if (post.soundId) {
      output.posts[post.id].normal += soundMap[post.soundId].title
      output.posts[post.id].normal += soundMap[post.soundId].artist
      output.posts[post.id].bold += soundMap[post.soundId].title
      output.posts[post.id].bold += soundMap[post.soundId].artist
      output.users[post.userId].normal += soundMap[post.soundId].title
      output.users[post.userId].normal += soundMap[post.soundId].artist
      output.users[post.userId].bold += soundMap[post.soundId].title
      output.users[post.userId].bold += soundMap[post.soundId].artist
      output.timeLine.normal += soundMap[post.soundId].title
      output.timeLine.normal += soundMap[post.soundId].artist
      output.timeLine.bold += soundMap[post.soundId].title
      output.timeLine.bold += soundMap[post.soundId].artist
    }
    // timeLine
    output.timeLine.normal += post.text
    // user
    output.users[post.userId].normal += post.text

    // commentのフォント追加
    output.posts[post.id].normal += commentMap[post.id].normal
    output.posts[post.id].bold += commentMap[post.id].bold

    // アルファベットを入れる
    output.posts[post.id].normal += 'ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ'
    output.posts[post.id].bold += 'ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ'
    output.posts[post.id].normal += 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    output.posts[post.id].bold += 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  }
  output.targetUser.normal += 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  output.targetUser.bold += 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  output.timeLine.normal += 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  output.timeLine.bold += 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  output.postDetail.normal += output.posts['01EX0SGMRHZP5JBA5JF2ZZQTP2'].normal
  output.postDetail.normal += output.posts['01EXNV3BSJV18WFYBS87TP4NFC'].normal
  output.postDetail.normal += output.posts['01EXH20KRBVP34RYHYDTSX8JS2'].normal
  output.postDetail.bold += output.posts['01EX0SGMRHZP5JBA5JF2ZZQTP2'].bold
  output.postDetail.bold += output.posts['01EXNV3BSJV18WFYBS87TP4NFC'].bold
  output.postDetail.bold += output.posts['01EXH20KRBVP34RYHYDTSX8JS2'].bold
  output.targetUser.normal += output.users['d28aefa3-8e81-4a8a-b91d-699e31861eb3'].normal
  output.targetUser.bold += output.users['d28aefa3-8e81-4a8a-b91d-699e31861eb3'].bold
  const allinone = {normal: '', bold: ''}
  for (const key of Object.keys(output)) {
    allinone.normal += output[key].normal
    allinone.normal += `いまなにしてる？
    投稿する
    サインイン
    ユーザー名
    パスワード
    初めての方はこちら
    新規登録
    利用規約に同意して
    登録する
    名前
    サインインはこちら
    @`
    allinone.bold += output[key].bold
    allinone.bold +=`いまなにしてる？
    投稿する
    サインイン
    ユーザー名
    パスワード
    初めての方はこちら
    新規登録
    利用規約に同意して
    登録する
    名前
    サインインはこちら
    @`
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
  await fs.mkdirSync('fontTextOutput/postDetail/', (err) => {console.error('err', err)});
  for (const [type,value] of Object.entries(output.postDetail)) {
    await fs.writeFile(`fontTextOutput/postDetail/${type}.txt`, value, (err) => {console.error('err', err)});
  }
  await fs.mkdirSync('fontTextOutput/targetUser/', (err) => {console.error('err', err)});
  for (const [type,value] of Object.entries(output.targetUser)) {
    await fs.writeFile(`fontTextOutput/targetUser/${type}.txt`, value, (err) => {console.error('err', err)});
  }
  await fs.mkdirSync('fontTextOutput/allinone/', (err) => {console.error('err', err)});
  for (const [type,value] of Object.entries(allinone)) {
    await fs.writeFile(`fontTextOutput/allinone/${type}.txt`, value, (err) => {console.error('err', err)});
  }
}
main()