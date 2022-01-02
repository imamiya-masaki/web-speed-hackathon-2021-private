import classNames from 'classnames';
import { useCallback, useRef, useState } from 'preact/hooks';
import {h} from 'preact';

import { AspectRatioBox } from './AspectRatioBox';
import { FontAwesomeIcon } from './FontAwesomeIcon';

/**
 * @typedef {object} Props
 * @property {string} src
 */

/**
 * クリックすると再生・一時停止を切り替えます。

 */
 const PausableMovie =  ({ src }) => {
  const animatorRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const handleClick = useCallback(() => {
    setIsPlaying((isPlaying) => {
      if (isPlaying) {
        animatorRef.current?.pause();
      } else {
        animatorRef.current?.play();
      }
      return !isPlaying;
    });
  }, []);


  return (
    <AspectRatioBox aspectHeight={1} aspectWidth={1}>
      <button className="group relative block w-full h-full" onClick={handleClick} type="button">
        <video src={src} className="w-full" autoplay={!window.matchMedia('(prefers-reduced-motion: reduce)').matches} muted loop ref={animatorRef}></video>
        <p
          className={classNames(
            'absolute left-1/2 top-1/2 flex items-center justify-center w-16 h-16 text-white text-3xl bg-black bg-opacity-50 rounded-full transform -translate-x-1/2 -translate-y-1/2',
            {
              'opacity-0 group-hover:opacity-100': isPlaying,
            },
          )}
        >
          <FontAwesomeIcon iconType={isPlaying ? 'pause' : 'play'} styleType="solid" />
        </p>
      </button>
    </AspectRatioBox>
  );
};
export default PausableMovie 