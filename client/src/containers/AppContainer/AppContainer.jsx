import React, {Suspense} from 'react';
import { Route, Routes} from 'react-router-dom';

import { AppPage } from '../../components/application/AppPage';
import { useFetch } from '../../hooks/use_fetch';
import { fetchJSON } from '../../utils/fetchers';
const AuthModalContainer = React.lazy(() => import('../AuthModalContainer/AuthModalContainer'));
const NewPostModalContainer =  React.lazy(() =>  import('../NewPostModalContainer/NewPostModalContainer'));
const NotFoundContainer= React.lazy(() => import('../NotFoundContainer/NotFoundContainer'));
const PostContainer = React.lazy(() => import('../PostContainer/PostContainer'));
const TermContainer= React.lazy(() => import('../TermContainer/TermContainer'));
const TimelineContainer = React.lazy(() => import('../TimelineContainer/TimelineContainer'));
const UserProfileContainer = React.lazy(() =>  import('../UserProfileContainer/UserProfileContainer'));
/** @type {React.VFC} */

const AppContainer = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  });

  const [activeUser, setActiveUser] = React.useState(null);
  const { data } = useFetch('/api/v1/me', fetchJSON);
  React.useEffect(() => {
    setActiveUser(data);
  }, [data]);

  const [modalType, setModalType] = React.useState('none');
  const handleRequestOpenAuthModal = React.useCallback(() => setModalType('auth'), []);
  const handleRequestOpenPostModal = React.useCallback(() => setModalType('post'), []);
  const handleRequestCloseModal = React.useCallback(() => setModalType('none'), []);
  return (
    <>
      <AppPage
        activeUser={activeUser}
        onRequestOpenAuthModal={handleRequestOpenAuthModal}
        onRequestOpenPostModal={handleRequestOpenPostModal}
      >
        <Suspense fallback={<p>loading...</p>}>
          <Routes>
                <Route exact element={<TimelineContainer />} path="/" />
                <Route element={<UserProfileContainer />} path="/users/:username" />
                <Route element={<PostContainer />} path="/posts/:postId" />
                <Route element={<TermContainer />} path="/terms" />
                <Route element={<NotFoundContainer />} path="*" />
          </Routes>
        </Suspense>
      </AppPage>
      <Suspense fallback={<></>}>
      {modalType === 'auth' ? (
        <AuthModalContainer onRequestCloseModal={handleRequestCloseModal} onUpdateActiveUser={setActiveUser} />
      ) : null}
      {modalType === 'post' ? <NewPostModalContainer onRequestCloseModal={handleRequestCloseModal} /> : null}
      </Suspense>
    </>
  );
};

export  {AppContainer};
