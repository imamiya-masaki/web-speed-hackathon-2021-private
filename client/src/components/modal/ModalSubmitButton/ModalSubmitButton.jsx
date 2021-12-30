import {h} from 'preact'
import { FontAwesomeIcon } from '../../foundation/FontAwesomeIcon';

/**
 * @typedef {object} Props
 * @property {string} children
 * @property {boolean} disabled
 * @property {boolean} loading

 */

const ModalSubmitButton = ({ children, disabled, loading, onClick }) => {
  return (
    <button
      class={`block px-8 py-2 text-white bg-green-600 rounded ${disabled ? 'opacity-50 cursor-not-allowed': ''}`}
      disabled={disabled}
      onClick={onClick}
      type="submit"
    >
      {loading ? (
        <span className="pr-2">
          <span className="inline-block animate-spin">
            <FontAwesomeIcon iconType="circle-notch" styleType="solid" />
          </span>
        </span>
      ) : null}
      <span>{children}</span>
    </button>
  );
};

export { ModalSubmitButton };
