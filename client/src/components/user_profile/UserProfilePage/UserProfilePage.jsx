import {h, Fragment} from 'preact';

import { Timeline } from '../../timeline/Timeline';
import { UserProfileHeader } from '../UserProfileHeader';

/**
 * @typedef {object} Props
 * @property {Array<Models.Post>} timeline
 * @property {Models.User} user
 */

const UserProfilePage = ({ timeline, user }) => {
  return (
    <Fragment>
      <UserProfileHeader user={user} />
      <div className="mt-6 border-t border-gray-300">
        <Timeline timeline={timeline}/>
      </div>
    </Fragment>
  );
};

export default UserProfilePage ;
