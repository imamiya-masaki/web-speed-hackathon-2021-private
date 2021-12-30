import {h, Fragment} from 'preact';

import { CommentList } from '../CommentList';
import { PostItem } from '../PostItem';

/**
 * @typedef {object} Props
 * @property {Array<Models.Comment>} comments
 * @property {Models.Post} post
 */


const PostPage = ({ comments, post }) => {
  return (
    <Fragment>
      <PostItem post={post} />
      <CommentList comments={comments} />
    </Fragment>
  );
};

export { PostPage };
