import {h, Fragment} from 'preact'
import Router from 'preact-router';
import lazy from 'preact-lazy';
import { useEffect, useState, useCallback, useMemo } from 'preact/hooks';
import { AppPage } from '../../components/application/AppPage';
import { useFetch } from '../../hooks/use_fetch';
import { fetchJSON } from '../../utils/fetchers';
const AuthModalContainer = lazy(() => import('../AuthModalContainer/AuthModalContainer'));
const NewPostModalContainer = lazy(() =>  import('../NewPostModalContainer/NewPostModalContainer'));
const NotFoundContainer= lazy(() => import('../NotFoundContainer/NotFoundContainer'));
const PostContainer = lazy(() => import('../PostContainer/PostContainer'));
const TermContainer= lazy(() => import('../TermContainer/TermContainer'));
const TimelineContainer = lazy(() => import('../TimelineContainer/TimelineContainer'));
const UserProfileContainer = lazy(() =>  import('../UserProfileContainer/UserProfileContainer'));

const AppContainer = () => {
  const [activeUser, setActiveUser] = useState(null);
  useEffect(() => {
    window.scrollTo(0, 0);
    fetch('/api/v1/me', {
      method: 'GET',
      cache: 'no-cache',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      if (res && res.ok) {
        setActiveUser(res.json());
      }
    })
  },[]);

  const [modalType, setModalType] = useState('none');
  const handleRequestOpenAuthModal = useCallback(() => setModalType('auth'), []);
  const handleRequestOpenPostModal = useCallback(() => setModalType('post'), []);
  const handleRequestCloseModal = useCallback(() => setModalType('none'), []);
  return (
    <Fragment>
      <AppPage
        activeUser={activeUser}
        onRequestOpenAuthModal={handleRequestOpenAuthModal}
        onRequestOpenPostModal={handleRequestOpenPostModal}
      >
          <Router>
            <TimelineContainer path="/"/>
            <UserProfileContainer path="/users/:username" />
            <PostContainer path="/posts/:postId" />
            <TermContainer path="/terms" />
            <NotFoundContainer path="*" />
          </Router>
      </AppPage>
      {modalType === 'auth' ? (
        <AuthModalContainer onRequestCloseModal={handleRequestCloseModal} onUpdateActiveUser={setActiveUser} />
      ) : null}
      {modalType === 'post' ? <NewPostModalContainer onRequestCloseModal={handleRequestCloseModal} /> : null}
    </Fragment>
  );
};

export  {AppContainer};
