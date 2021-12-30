import {h} from 'preact';
import { useEffect } from 'preact/hooks';
import InfiniteScroll from '../../components/foundation/InfiniteScroll.jsx';
import  UserProfilePage  from '../../components/user_profile/UserProfilePage/UserProfilePage';
import { useFetch } from '../../hooks/use_fetch';
import { useInfiniteFetch } from '../../hooks/use_infinite_fetch';
import { fetchJSON } from '../../utils/fetchers';
import { NotFoundContainer } from '../NotFoundContainer';

const UserProfileContainer = () => {
  const username = location.pathname.slice(7)
  const { data: user, isLoading: isLoadingUser } = useFetch(`/api/v1/users/${username}`, fetchJSON);
  const { data: posts, fetchMore } = useInfiniteFetch(`/api/v1/users/${username}/posts`, fetchJSON);

  if (user === null) {
    return <NotFoundContainer />;
  }
  useEffect(() => {
    document.title = `${user.name} さんのタイムライン - CAwitter`
  })

  return (
    <InfiniteScroll fetchMore={fetchMore} items={posts}>
      <UserProfilePage timeline={posts} user={user} />
    </InfiniteScroll>
  );
};

export default UserProfileContainer ;
