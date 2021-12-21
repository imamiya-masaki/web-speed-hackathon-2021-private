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
const SoundWaveSVG = ({ ratios }) => {
  return (
    <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 1">
      {ratios.map((obj, idx) => {
        const value = obj.ratio;
        return (
          <rect key={`${obj.id}#${idx}`} fill="#2563EB" height={value} width="1" x={idx} y={1 - value} />
        );
      })}
    </svg>
  );
};

export { SoundWaveSVG };
