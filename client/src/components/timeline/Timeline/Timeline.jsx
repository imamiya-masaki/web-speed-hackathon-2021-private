import {h} from 'preact';

import TimelineItem from '../TimelineItem/TimelineItem';

/**
 * @typedef {object} Props
 * @property {Array<Models.Post>} timeline
 */

const Timeline = ({ timeline, type }) => {
  /* 
  ここ見えている範囲のレンダリングをして、それ以外は、アイドル時間中にすうようにしたい
  バーチャルレンダリング
  */
  return (
    <section>
      {timeline.map((post) => {
        return <TimelineItem key={post.id} post={post} />;
      })}
    </section>
  );
};

export { Timeline };
