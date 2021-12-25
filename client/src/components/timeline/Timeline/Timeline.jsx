import React from 'react';

import { TimelineItem } from '../TimelineItem';

/**
 * @typedef {object} Props
 * @property {Array<Models.Post>} timeline
 */

/** @type {React.VFC<Props>} */
const Timeline = ({ timeline, type }) => {
  /* 
  ここ見えている範囲のレンダリングをして、それ以外は、アイドル時間中にすうようにしたい
  バーチャルレンダリング
  */
  return (
    <section id={type}>
      {timeline.map((post) => {
        return <TimelineItem key={post.id} post={post} />;
      })}
    </section>
  );
};

export { Timeline };
