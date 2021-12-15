import _ from 'lodash';

export default null;

const worker = self;
worker.addEventListener("message", ({ data: { left, right } }) => {
  // 音声をデコードする
  // /** @type {AudioBuffer} */
  // 左の音声データの絶対値を取る
  const leftData = _.map(left, Math.abs);
  // 右の音声データの絶対値を取る
  const rightData = _.map(right, Math.abs);

  // 左右の音声データの平均を取る
  const normalized = _.map(_.zip(leftData, rightData), _.mean);
  // 100 個の chunk に分ける
  const chunks = _.chunk(normalized, Math.ceil(normalized.length / 100));
  // chunk ごとに平均を取る
  const peaksO = _.map(chunks, _.mean);
  // chunk の平均の中から最大値を取る
  const maxO = _.max(peaksO);
  worker.postMessage({value: {maxO, peaksO}});
});
// worker.addEventListener('soundCalculate', ({data: {soundData} }: MessageEvent<{ soundData: any }>) => {
//   const audioCtx = new AudioContext();
//   console.log('worker');
//   // 音声をデコードする
//   // /** @type {AudioBuffer} */
//   const bufferPromise: any = new Promise((resolve, reject) => {
//     audioCtx.decodeAudioData(soundData.slice(0), resolve, reject);
//   });
//   bufferPromise.then((buffer) => {
//   // 左の音声データの絶対値を取る
//   const leftData = _.map(buffer.getChannelData(0), Math.abs);
//   // 右の音声データの絶対値を取る
//   const rightData = _.map(buffer.getChannelData(1), Math.abs);

//   // 左右の音声データの平均を取る
//   const normalized = _.map(_.zip(leftData, rightData), _.mean);
//   // 100 個の chunk に分ける
//   const chunks = _.chunk(normalized, Math.ceil(normalized.length / 100));
//   // chunk ごとに平均を取る
//   const peaksO = _.map(chunks, _.mean);
//   // chunk の平均の中から最大値を取る
//   const maxO = _.max(peaksO);
//   worker.postMessage({maxO, peaksO});
//   })
// })