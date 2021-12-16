import React from 'react';
/**
 * @param {ArrayBuffer} data
 * @returns {Promise<{ max: number, peaks: number[] }}
 */

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
  const worker = new Worker(new URL('./workerCalculate.js', import.meta.url));

  React.useEffect(() => {
    worker.addEventListener('message', ({data: {value}}) => {
      const max = value.maxO;
      const peaks = value.peaksO;
      setPeaks({max, peaks})
    });
    if (soundData) {
      const audioCtx = new AudioContext();
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
