import React from 'react';

/**
 * @typedef {object} Props
 * @property {React.ReactNode} children
 * @property {any} items
 * @property {() => void} fetchMore
 */

/** @type {React.VFC<Props>} */
const InfiniteScroll = ({ children, fetchMore, items }) => {
  const latestItem = items[items.length - 1];

  const prevReachedRef = React.useRef(false);
  React.useEffect(() => {
    const handler2 = () => {
       const isBottom = document.body.getBoundingClientRect().bottom <= window.innerHeight;
       if (isBottom && !prevReachedRef.current) {
        // アイテムがないときは追加で読み込まない
        if (latestItem !== undefined) {
          fetchMore();
        }
      }
    }

    // 最初は実行されないので手動で呼び出す
    prevReachedRef.current = false;
    handler2();

    document.addEventListener('wheel', handler2, { passive: true, capture: true });
    document.addEventListener('touchmove', handler2, { passive: true, capture: true });
    document.addEventListener('resize', handler2, { passive: true, capture: true });
    document.addEventListener('scroll', handler2, { passive: true, capture: true });
    return () => {
      document.removeEventListener('wheel', handler2);
      document.removeEventListener('touchmove', handler2);
      document.removeEventListener('resize', handler2);
      document.removeEventListener('scroll', handler2);
    };
  }, [latestItem, fetchMore]);

  return <>{children}</>;
};

export { InfiniteScroll };
