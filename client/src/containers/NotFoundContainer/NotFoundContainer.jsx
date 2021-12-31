import {h} from 'preact';
import { useEffect } from 'preact/hooks';

import { NotFoundPage } from '../../components/application/NotFoundPage';

const NotFoundContainer = () => {
  useEffect(() => {
    document.title = "ページが見つかりません - CAwitter"
  })
  return (
      <NotFoundPage />
  );
};

export { NotFoundContainer };
export default NotFoundContainer;