import classNames from 'classnames';
import sizeOf from 'image-size';
import React from 'react';

import { useFetch } from '../../../hooks/use_fetch';
import { fetchBinary } from '../../../utils/fetchers';

/**
 * @typedef {object} Props
 * @property {string} alt
 * @property {string} src
 */

/**
 * アスペクト比を維持したまま、要素のコンテンツボックス全体を埋めるように画像を拡大縮小します
 * @type {React.VFC<Props>}
 */
const CoveredImage = ({ alt, src, height, width }) => {
  const [ratioBool, setRatioBool] = React.useState(false) // containerRatio > imageRatioの時true
  React.useEffect(() => {
    const img = new Image();
    img.onload = function () {
      setRatioBool((height/width) > (img.height/img.width))
    };
    img.src = src;
  },[ratioBool])
  /** @type {React.RefCallback<HTMLDivElement>} */
  // const callbackRef = React.useCallback((el) => {
  //   console.log('callbackRef', el, el?.clientHeight, el?.clientWidth, height, width);
  //   setContainerSize({
  //     height: el?.clientHeight ?? 0,
  //     width: el?.clientWidth ?? 0,
  //   });
  // }, []);

  // if (isLoading || data === null || blobUrl === null) {
  //   return null;
  // }
  return (
    <div className="relative w-full h-full overflow-hidden">
      <img
        alt={alt}
        className={classNames('absolute left-1/2 top-1/2 max-w-none transform -translate-x-1/2 -translate-y-1/2', {
          'w-auto h-full': ratioBool,
          'w-full h-auto': !ratioBool,
        })}
        src={src}
      />
    </div>
  );
};

export { CoveredImage };
