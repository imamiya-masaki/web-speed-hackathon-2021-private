import {h} from 'preact';

/**
 * @typedef {object} Props
 * @property {string} alt
 * @property {string} src
 */

/**
 * アスペクト比を維持したまま、要素のコンテンツボックス全体を埋めるように画像を拡大縮小します

 */
export default ({ alt, src, lazy }) => {
  // if (isLoading || data === null || blobUrl === null) {
  //   return null;
  // }
  return (
    <div className="relative w-full h-full overflow-hidden">
      {lazy ?<img
        alt={alt}
        className={'absolute left-1/2 top-1/2 max-w-none transform -translate-x-1/2 -translate-y-1/2 w-full h-full'}
        src={src}
        loading='lazy'
      />:<img
      alt={alt}
      className={'absolute left-1/2 top-1/2 max-w-none transform -translate-x-1/2 -translate-y-1/2 w-full h-full'}
      src={src}
      loading='eager'
    />}
    </div>
  );
};


