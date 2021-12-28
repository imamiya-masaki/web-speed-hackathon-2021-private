import React from 'react';

import { getProfileImagePath } from '../../../utils/get_path';
import { FontAwesomeIcon } from '../../foundation/FontAwesomeIcon';

/**
 * @typedef {object} Props
 * @property {Models.User} user
 */

/** @type {React.VFC<Props>} */
const UserProfileHeader = ({ user }) => {
  // 画像の平均色を取得します
  return (
    <header className="relative" id="user-timeline">
      <p className="h-32 bg-gray-300" style={{ backgroundColor: user.profileImage.rgb }} ></p>
      <img alt="" className="absolute left-2/4 m-0 w-28 h-28 bg-gray-300 border border-gray-300 rounded-full overflow-hidden transform -translate-x-1/2 -translate-y-1/2 sm:w-32 sm:h-32" src={getProfileImagePath(user.profileImage.id)} async loading='lazy'/>
      <div className="pt-20 px-4">
        <h1 className="text-2xl font-bold">{user.name}</h1>
        <p className="text-gray-600">@{user.username}</p>
        <p className="pt-2">{user.description}</p>
        <p className="pt-2 text-gray-600 text-sm">
          <span className="pr-1">
            <FontAwesomeIcon iconType="calendar-alt" styleType="regular" />
          </span>
          <span>
            <time dateTime={user.createdAt}>
              {user.createdAt.slice(0,10).split('-').reduce((pre, curr) =>  pre.length < 5 ? pre+'年'+Number(curr) : pre+'月'+Number(curr))+'日'}
            </time>
            からサービスを利用しています
          </span>
        </p>
      </div>
    </header>
  );
};

export { UserProfileHeader };
