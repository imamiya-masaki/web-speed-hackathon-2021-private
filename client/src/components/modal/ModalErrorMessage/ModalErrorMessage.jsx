import classNames from 'classnames';
import React from 'react';

import { FontAwesomeIcon } from '../../foundation/FontAwesomeIcon';

/**
 * @typedef {object} Props
 * @property {string | null} children
 */

/** @type {React.VFC<Props>} */
const ModalErrorMessage = ({ children }) => {
  return (
    <span className={classNames('block h-6 text-red-600', { invisible: !children })}>
      <p className="mr-1">
        <FontAwesomeIcon iconType="exclamation-circle" styleType="solid" />
      </p>
      {children}
    </span>
  );
};

export { ModalErrorMessage };
