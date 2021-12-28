import classNames from 'classnames';
import React from 'react';

import { getImagePath } from '../../../utils/get_path';
import { AspectRatioBox } from '../../foundation/AspectRatioBox';
import CoveredImage from '../../foundation/CoveredImage';

/**
 * @typedef {object} Props
 * @property {Array<Models.Image>} images
 */

/** @type {React.VFC<Props>} */
const ImageArea = ({ images }) => {
  const width = images.length >= 2 ? 245 : 494;

  return (
    <AspectRatioBox aspectHeight={9} aspectWidth={16}>
      <div className="grid gap-1 grid-cols-2 grid-rows-2 w-full h-full border border-gray-300 rounded-lg overflow-hidden">
        {images.map((image, idx) => {
          const height = (images.length === 3 && idx > 0) || (images.length === 4) ? 137 : 277;
          let type = 0;
          if (height === 277 && width === 245) {
            type = 1;
          } else if (height === 137 && width === 245) {
            type = 2;
          } 
          return (
            <div
              key={image.id}
              // CSS Grid で表示領域を指定する
              className={classNames('bg-gray-300', {
                'col-span-1': images.length !== 1,
                'col-span-2': images.length === 1,
                'row-span-1': images.length > 2 && (images.length !== 3 || idx !== 0),
                'row-span-2': images.length <= 2 || (images.length === 3 && idx === 0),
              })}
            >
              <CoveredImage alt={image.alt} src={getImagePath(image.id, type)} width={width} height={height} lazy={width!==494 || height !== 277}/>
            </div>
          );
        })}
      </div>
    </AspectRatioBox>
  );
};

export { ImageArea };
