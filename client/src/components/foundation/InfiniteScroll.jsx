import {h, Fragment} from 'preact';
import {useEffect, useRef} from 'preact/hooks'
/**
 * @typedef {object} Props

 * @property {any} items
 * @property {() => void} fetchMore
 */


export default ({ children, fetchMore, items }) => {
  const latestItem = items[items.length - 1];
  let running = false;
  let cnt = 0;
  const prevReachedRef = useRef(false);
  useEffect(() => {
    const handler2 = () => {
      if (running && cnt != 0) {
       return
      }
      running = true;
      setTimeout(function() {
        running = false;
        const isBottom = Math.floor(document.body.getBoundingClientRect().bottom) <= Math.floor(window.innerHeight);
        if (isBottom && !prevReachedRef.current) {
          // アイテムがないときは追加で読み込まない
          if (latestItem !== undefined) {
            const output = fetchMore();
            cnt++
          }
        }
      }, 500);
    }
    // 最初は実行されないので手動で呼び出す
    prevReachedRef.current = false;
    handler2();
    if (cnt === 0) {
      document.addEventListener('wheel', handler2, { passive: true, capture: true });
      document.addEventListener('touchmove', handler2, { passive: true, capture: true });
      document.addEventListener('resize', handler2, { passive: true, capture: true });
      document.addEventListener('scroll', handler2, { passive: true, capture: true });
    }
  }, [latestItem, fetchMore, cnt, running]);

  return <Fragment>{children}</Fragment>;
};
