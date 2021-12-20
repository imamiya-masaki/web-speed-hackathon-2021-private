import { promises as fs } from 'fs';
import path from 'path';

import Router from 'express-promise-router';
import httpErrors from 'http-errors';
import { v4 as uuidv4 } from 'uuid';

import { convertSound } from '../../converters/convert_sound';
import { UPLOAD_PATH } from '../../paths';
import { extractMetadataFromSound } from '../../utils/extract_metadata_from_sound';
import Log4js from 'log4js';
const AudioContext = require('web-audio-api').AudioContext
const logger = Log4js.getLogger();
logger.level = "debug"; //これがないと表示されない
// import { SoundPeaks } from '../../models';
// 変換した音声の拡張子
const EXTENSION = 'mp3';

const router = Router();

router.post('/sounds', async (req, res) => {
  if (req.session.userId === undefined) {
    throw new httpErrors.Unauthorized();
  }
  if (Buffer.isBuffer(req.body) === false) {
    throw new httpErrors.BadRequest();
  }

  const soundId = uuidv4();
  logger.debug('/sound', req.body, Buffer.isBuffer(req.body));
  const { artist, title } = await extractMetadataFromSound(req.body);

  const converted = await convertSound(req.body, {
    // 音声の拡張子を指定する
    extension: EXTENSION,
  });

  const filePath = path.resolve(UPLOAD_PATH, `./sounds/${soundId}.${EXTENSION}`);
  await fs.writeFile(filePath, converted);

  return res.status(200).type('application/json').send({ artist, id: soundId, title });
});
// router.get('/peaks/:soundId', async (req, res) => {
//   const soundId = req.params.soundId
//   const getPeaks = await SoundPeaks.findAll({where:{soundId: soundId}})
// })

export { router as soundRouter };
