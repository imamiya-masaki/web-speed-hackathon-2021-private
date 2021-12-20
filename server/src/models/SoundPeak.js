import { DataTypes, Sequelize } from 'sequelize';

import { sequelize } from '../sequelize';

/**
 * @typedef {object} SoundPeakAttributes
 * @property {string} id
 * @property {number} max
 * @property {number} peak
 */

/**
 * @typedef {import('sequelize').Model<SoundPeakAttributes>} SoundPeakModel
 */

/** @type {import('sequelize').ModelCtor<SoundPeakModel>} */
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
  max: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  peak: {
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
      exclude: ['soundId', 'index'],
    },
    order: [
      ['index', 'DESC'],
    ],
  },
});

export { SoundPeak };
