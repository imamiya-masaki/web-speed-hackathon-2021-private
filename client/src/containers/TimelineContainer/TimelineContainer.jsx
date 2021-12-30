import {h} from 'preact';
import { useEffect } from 'preact/hooks';
import InfiniteScroll from '../../components/foundation/InfiniteScroll';
import { useInfiniteFetch } from '../../hooks/use_infinite_fetch';
import { fetchJSON } from '../../utils/fetchers';
import { Timeline  } from '../../components/timeline/Timeline';
const TimelineContainer = () => {
  const { data: posts, fetchMore } = useInfiniteFetch('/api/v1/posts', fetchJSON);
  useEffect(() => {
    document.title = "タイムライン - CAwitter"
  })
  return (
    <InfiniteScroll fetchMore={fetchMore} items={posts}>
      <Timeline timeline={posts} type={'main-timeline'}/>
    </InfiniteScroll>
  );
};

export default TimelineContainer;
