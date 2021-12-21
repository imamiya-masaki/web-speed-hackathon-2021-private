import { DataTypes, Sequelize } from 'sequelize';

import { sequelize } from '../sequelize';

/**
 * @typedef {object} SoundPeaksAttributes
 * @property {string} id
 * @property {number} max
 * @property {number} ratio
 * @property {number} index
 */

/**
 * @typedef {import('sequelize').Model<SoundPeaksAttributes>} SoundPeaksModel
 */

/** @type {import('sequelize').ModelCtor<SoundPeaksModel>} */
const SoundPeak = sequelize.define('SoundPeak', {
  id: {
    allowNull: false,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    type: DataTypes.UUID,
  },
  soundId: {
    allowNull: false,
    type: DataTypes.UUID,
  },
  ratio: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  index: {
    allowNull: false,
    type: DataTypes.INTEGER
  }
},
{
  defaultScope: {
    attributes: {
      exclude: ['soundId', 'index', 'createdAt', 'updatedAt'],
    },
    order: [
      ['index', 'DESC'],
    ],
  },
});

export { SoundPeak };
