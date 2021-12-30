import {h} from 'preact';

import { CommentItem } from '../CommentItem';

/**
 * @typedef {object} Props
 * @property {Array<Models.Comment>} comments
 */


const CommentList = ({ comments }) => {
  return (
    <div id="postdetail">
      {comments.map((comment) => {
        return <CommentItem key={comment.id} comment={comment} />;
      })}
    </div>
  );
};

export { CommentList };
