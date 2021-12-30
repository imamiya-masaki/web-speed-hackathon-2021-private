import {h} from 'preact';

import { NotFoundPage } from '../../components/application/NotFoundPage';

const NotFoundContainer = () => {
  document.title = "ページが見つかりません - CAwitter"
  return (
      <NotFoundPage />
  );
};

export { NotFoundContainer };
export default NotFoundContainer;