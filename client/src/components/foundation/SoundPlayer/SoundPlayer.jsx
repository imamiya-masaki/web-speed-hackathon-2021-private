import {h} from 'preact';
import {useState, useCallback, useRef} from 'preact/hooks';
import { getSoundPath } from '../../../utils/get_path';
import { AspectRatioBox } from '../AspectRatioBox';
import { FontAwesomeIcon } from '../FontAwesomeIcon';
import { SoundWaveSVG } from '../SoundWaveSVG';

/**
 * @typedef {object} Props
 * @property {Models.Sound} sound
 */

/**

 */
const SoundPlayer = ({ sound }) => {

  const [currentTimeRatio, setCurrentTimeRatio] = useState(0);

  const handleTimeUpdate = useCallback((ev) => {
    const el = ev.currentTarget;
    setCurrentTimeRatio(el.currentTime / el.duration);
  }, []);


  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const handleTogglePlaying = () => {
    setIsPlaying((isPlaying) => {
      if (isPlaying) {
        audioRef.current?.pause();
      } else {
        audioRef.current?.play();
      }
      return !isPlaying;
    });
  };

  return (
    <div className="flex items-center justify-center w-full h-full bg-gray-300">
      <audio ref={audioRef} loop={true} onTimeUpdate={handleTimeUpdate} src={getSoundPath(sound.id)} async/>
      <span className="span-2">
        <button
          className="flex items-center justify-center w-8 h-8 text-white text-sm bg-blue-600 rounded-full hover:opacity-75"
          onClick={handleTogglePlaying}
          type="button"
        >
          <FontAwesomeIcon iconType={isPlaying ? 'pause' : 'play'} styleType="solid" />
        </button>
      </span>
      <div className="flex flex-col flex-grow flex-shrink pt-2 min-w-0 h-full">
        <p className="whitespace-nowrap text-sm font-bold overflow-hidden overflow-ellipsis">{sound.title}</p>
        <p className="text-gray-500 whitespace-nowrap text-sm overflow-hidden overflow-ellipsis">{sound.artist}</p>
        <div className="pt-2">
          <AspectRatioBox aspectHeight={1} aspectWidth={10}>
            <div className="relative w-full h-full">
              <div className="absolute inset-0 w-full h-full">
                <SoundWaveSVG ratios={sound.soundPeak}/>
              </div>
              <p
                className="absolute inset-0 w-full h-full bg-gray-300 opacity-75"
                style={{ left: `${currentTimeRatio * 100}%` }}
              ></p>
            </div>
          </AspectRatioBox>
        </div>
      </div>
    </div>
  );
};

export { SoundPlayer };
