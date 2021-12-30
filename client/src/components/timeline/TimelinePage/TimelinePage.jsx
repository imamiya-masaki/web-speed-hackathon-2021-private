import {h} from 'preact';

import { Timeline } from '../Timeline';

/**
 * @typedef {object} Props
 * @property {Array<Models.Post>} timeline
 */

const TimelinePage = ({ timeline }) => {
  return <Timeline timeline={timeline} />;
};

export { TimelinePage };
