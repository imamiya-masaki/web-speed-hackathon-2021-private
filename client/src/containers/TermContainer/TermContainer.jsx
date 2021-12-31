import {h} from 'preact';
import { useEffect } from 'preact/hooks';
import { TermPage } from '../../components/term/TermPage';

const TermContainer = () => {
  useEffect(() => {
  document.title = "利用規約 - CAwitter"
  })
  return (
      <TermPage />
  );
};

export default TermContainer ;
