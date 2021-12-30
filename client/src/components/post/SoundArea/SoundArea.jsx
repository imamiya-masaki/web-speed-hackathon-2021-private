import {h} from 'preact';

import { SoundPlayer } from '../../foundation/SoundPlayer';

/**
 * @typedef {object} Props
 * @property {Models.Sound} sound
 */


const SoundArea = ({ sound }) => {
  return (
    <div className="relative w-full h-full border border-gray-300 rounded-lg overflow-hidden">
      <SoundPlayer sound={sound} />
    </div>
  );
};

export { SoundArea };
