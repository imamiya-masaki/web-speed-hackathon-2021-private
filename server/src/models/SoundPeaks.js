import { DataTypes, Sequelize } from 'sequelize';

import { sequelize } from '../sequelize';

/**
 * @typedef {object} SoundPeaksAttributes
 * @property {string} id
 * @property {number} max
 * @property {number} peak
 */

/**
 * @typedef {import('sequelize').Model<SoundPeaksAttributes>} SoundModel
 */

/** @type {import('sequelize').ModelCtor<SoundModel>} */
const SoundPeaks = sequelize.define('Sound', {
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
  }
});

export { SoundPeaks };
