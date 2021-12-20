import { Comment } from './Comment';
import { Image } from './Image';
import { Movie } from './Movie';
import { Post } from './Post';
import { sequelize } from '../sequelize';
import { PostsImagesRelation } from './PostsImagesRelation';
import { ProfileImage } from './ProfileImage';
import { Sound } from './Sound';
import { SoundPeak } from './SoundPeak';
// import { SoundPeaks } from './SoundPeaks';
import { User } from './User';

User.hasMany(Post, {
  as: 'posts',
  foreignKey: {
    allowNull: false,
    name: 'userId',
  },
});
Post.belongsTo(User, {
  as: 'user',
  foreignKey: {
    allowNull: false,
    name: 'userId',
  },
});

User.belongsTo(ProfileImage, {
  as: 'profileImage',
  foreignKey: {
    allowNull: false
  },
});

Post.belongsToMany(Image, {
  as: 'images',
  foreignKey: {
    name: 'postId',
  },
  otherKey: {
    name: 'imageId',
  },
  through: PostsImagesRelation,
});

Post.belongsTo(Movie, {
  as: 'movie',
});
Sound.hasMany(SoundPeak, {
  as: 'soundPeak',
  foreignKey: {
    allowNull: false,
    name: 'soundId'
  }
}
)
Sound.hasOne(SoundPeak, {
  as: 'soundPeakMax',
  where: sequelize.fn('max', sequelize.col('peak'))
})
Post.belongsTo(Sound, {
  as: 'sound',
});

Post.hasMany(Comment, {
  as: 'comments',
  foreignKey: {
    allowNull: false,
    name: 'postId',
  },
  
});
Comment.belongsTo(Post, {
  as: 'post',
  foreignKey: {
    allowNull: false,
    name: 'postId',
  },
});

Comment.belongsTo(User, {
  as: 'user',
  foreignKey: {
    allowNull: false,
    name: 'userId',
  },
});

export { User, Post, Image, Movie, Sound, Comment, ProfileImage, PostsImagesRelation, SoundPeak };
