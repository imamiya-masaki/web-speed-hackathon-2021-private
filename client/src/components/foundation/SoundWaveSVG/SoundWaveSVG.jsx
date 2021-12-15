import _ from 'lodash';
import React from 'react';
/**
 * @param {ArrayBuffer} data
 * @returns {Promise<{ max: number, peaks: number[] }}
 */
async function calculate(data) {
  const audioCtx = new AudioContext();

  // 音声をデコードする
  /** @type {AudioBuffer} */
  const buffer = await new Promise((resolve, reject) => {
    audioCtx.decodeAudioData(data.slice(0), resolve, reject);
  });
  console.log('buffer', buffer, buffer.getChannelData(0), buffer.getChannelData(1), data);
  // 左の音声データの絶対値を取る
  const leftData = _.map(buffer.getChannelData(0), Math.abs);
  // 右の音声データの絶対値を取る
  const rightData = _.map(buffer.getChannelData(1), Math.abs);

  // 左右の音声データの平均を取る
  const normalized = _.map(_.zip(leftData, rightData), _.mean);
  // 100 個の chunk に分ける
  const chunks = _.chunk(normalized, Math.ceil(normalized.length / 100));
  // chunk ごとに平均を取る
  const peaks = _.map(chunks, _.mean);
  // chunk の平均の中から最大値を取る
  const max = _.max(peaks);

  return { max, peaks };
}

/**
 * @typedef {object} Props
 * @property {ArrayBuffer} soundData
 */

/**
 * @type {React.VFC<Props>}
 */
const SoundWaveSVG = ({ soundData }) => {
  const uniqueIdRef = React.useRef(Math.random().toString(16));
  const [{ max, peaks }, setPeaks] = React.useState({ max: 0, peaks: [] });
      const audioCtx = new AudioContext();
    const worker = new Worker(new URL('./workerCalculate.js', import.meta.url));

  React.useEffect(() => {
    worker.addEventListener('message', ({data: {value}}) => {
      const max = value.maxO;
      const peaks = value.peaksO
      setPeaks({max, peaks})
    });
    if (soundData) {
      new Promise((resolve, reject) => {
        audioCtx.decodeAudioData(soundData.slice(0), resolve, reject);
      }).then(buffer => {
        worker.postMessage({left: buffer.getChannelData(0), rgiht: buffer.getChannelData(1)})
      })
    }
  }, [soundData]);

  return (
    <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 1">
      {peaks.map((peak, idx) => {
        const ratio = peak / max;
        return (
          <rect key={`${uniqueIdRef.current}#${idx}`} fill="#2563EB" height={ratio} width="1" x={idx} y={1 - ratio} />
        );
      })}
    </svg>
  );
};

export { SoundWaveSVG };
