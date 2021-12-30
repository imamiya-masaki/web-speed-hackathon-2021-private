import {h} from 'preact';

import { TermPage } from '../../components/term/TermPage';

const TermContainer = () => {
  document.title = "利用規約 - CAwitter"
  return (
      <TermPage />
  );
};

export default TermContainer ;
