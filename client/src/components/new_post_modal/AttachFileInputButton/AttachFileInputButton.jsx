import {h} from 'preact';

/**
 * @typedef {object} Props
 * @property {string} accept
 * @property {boolean} active


 */


const AttachFileInputButton = ({ accept, active, icon, onChange }) => {
  return (
    <label className="relative flex items-center justify-center focus-within:outline-black cursor-pointer">
      <span
        className={`flex items-center justify-center w-12 h-12 rounded-full ${active ? 'bg-green-100' : 'bg-gray-100'}`}
      >
        {icon}
      </span>
      <input multiple accept={accept} className="sr-only" onChange={onChange} type="file" />
    </label>
  );
};

export { AttachFileInputButton };
