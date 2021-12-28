import React,{lazy, Suspense} from 'react';

import { getMoviePath } from '../../../utils/get_path';
const PausableMovie = lazy(() => import('../../foundation/PausableMovie'));

/**
 * @typedef {object} Props
 * @property {Models.Movie} movie
 */

/** @type {React.VFC<Props>} */
const MovieArea = ({ movie }) => {
  return (
    <div className="relative w-full h-full bg-gray-300 border border-gray-300 rounded-lg overflow-hidden">
      <Suspense><PausableMovie src={getMoviePath(movie.id)} /></Suspense>
    </div>
  );
};

export { MovieArea };
