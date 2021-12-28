import React from 'react';
import { Helmet } from 'react-helmet';

import InfiniteScroll from '../../components/foundation/InfiniteScroll';
import { useInfiniteFetch } from '../../hooks/use_infinite_fetch';
import { fetchJSON } from '../../utils/fetchers';
import { Timeline  } from '../../components/timeline/Timeline';
/** @type {React.VFC} */
const TimelineContainer = () => {
  const { data: posts, fetchMore } = useInfiniteFetch('/api/v1/posts', fetchJSON);

  return (
    <InfiniteScroll fetchMore={fetchMore} items={posts}>
      <Helmet>
        <title>タイムライン - CAwitter</title>
      </Helmet>
      <Timeline timeline={posts} type={'main-timeline'}/>
    </InfiniteScroll>
  );
};

export default TimelineContainer;
