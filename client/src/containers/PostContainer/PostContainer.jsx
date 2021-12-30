import {h} from 'preact';
import { useEffect } from 'preact/hooks';

import  InfiniteScroll  from '../../components/foundation/InfiniteScroll';
import { PostPage } from '../../components/post/PostPage';
import { useFetch } from '../../hooks/use_fetch';
import { useInfiniteFetch } from '../../hooks/use_infinite_fetch';
import { fetchJSON } from '../../utils/fetchers';
import { NotFoundContainer } from '../NotFoundContainer';

const PostContainer = () => {
  const  postId = location.pathname.slice(7)
  const { data: post, isLoading: isLoadingPost } = useFetch(`/api/v1/posts/${postId}`, fetchJSON);

  const { data: comments, fetchMore } = useInfiniteFetch(`/api/v1/posts/${postId}/comments`, fetchJSON);

  if (post === null) {
    return <NotFoundContainer />;
  }
  useEffect(() => {
    document.title = `${post.user.name} さんのつぶやき - CAwitter`
  });

  return (
    <InfiniteScroll fetchMore={fetchMore} items={comments}>
      <PostPage comments={comments} post={post} />
    </InfiniteScroll>
  );
};

export default PostContainer ;
