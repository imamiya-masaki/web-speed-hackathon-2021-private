import { Animator } from 'gifler';
import { GifReader } from 'omggif';
import { useCallback, useRef, useState } from 'preact/hooks';
import {h} from 'preact';

import { useFetch } from '../../hooks/use_fetch';
import { fetchBinary } from '../../utils/fetchers';
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
  const { data } = useFetch(src, fetchBinary);


  const animatorRef = useRef(null);

  const canvasCallbackRef = useCallback(
    (el) => {
      animatorRef.current?.stop();
      if (el === null || data === null) {
        return;
      }
      const worker = new Worker(new URL('./animate.js', import.meta.url));
      worker.addEventListener('message', (res) => {
        const frames = res.data
        const reader = new GifReader(new Uint8Array(data));
        const animator = new Animator(reader, frames);
        animator.animateInCanvas(el);
        animator.onFrame(frames[0]);
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          setIsPlaying(false);
          animator.stop();
        } else {
          setIsPlaying(true);
          animator.start();
        }
        animatorRef.current = animator;
      })
      worker.postMessage(data)
    },
    [data],
  );

  const [isPlaying, setIsPlaying] = useState(true);
  const handleClick = useCallback(() => {
    setIsPlaying((isPlaying) => {
      if (isPlaying) {
        animatorRef.current?.stop();
      } else {
        animatorRef.current?.start();
      }
      return !isPlaying;
    });
  }, []);

  // if (isLoading || data === null) {
  //   return null;
  // }

  return (
    <AspectRatioBox aspectHeight={1} aspectWidth={1}>
      <button className="group relative block w-full h-full" onClick={handleClick} type="button">
        <canvas ref={canvasCallbackRef} className="w-full" width="574" height="574"/>
        {/* <img src={src}></img> */}
        <div
          className={`absolute left-1/2 top-1/2 flex items-center justify-center w-16 h-16 text-white text-3xl bg-black bg-opacity-50 rounded-full transform -translate-x-1/2 -translate-y-1/2 ${isPlaying ? 'opacity-0 group-hover:opacity-100' : ''}`}
        >
          <FontAwesomeIcon iconType={isPlaying ? 'pause' : 'play'} styleType="solid" />
        </div>
      </button>
    </AspectRatioBox>
  );
};
export default PausableMovie 