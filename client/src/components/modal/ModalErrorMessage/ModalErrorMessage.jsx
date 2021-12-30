import {h} from 'preact';

import { FontAwesomeIcon } from '../../foundation/FontAwesomeIcon';

/**
 * @typedef {object} Props
 * @property {string | null} children
 */


const ModalErrorMessage = ({ children }) => {
  return (
    <span 
    class={`block h-6 text-red-600 ${!children ? 'invisible': ''}`}>
      <p className="mr-1">
        <FontAwesomeIcon iconType="exclamation-circle" styleType="solid" />
      </p>
      {children}
    </span>
  );
};

export { ModalErrorMessage };
