import React from 'react';
import svgInfo from './svgInfo.json';
/**
 * @typedef {object} Props
 * @property {string} iconType
 * @property {'solid' | 'regular'} styleType
 */

/** @type {React.VFC<Props>} */
const FontAwesomeIcon = ({ iconType, styleType }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={svgInfo[iconType].viewBox} className="font-awesome inline-block leading-none fill-current">
      <path d={svgInfo[iconType][styleType]} />
    </svg>
  );
};

export { FontAwesomeIcon };
