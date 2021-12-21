import { promises as fs } from 'fs';
import path from 'path';

import Router from 'express-promise-router';
import httpErrors from 'http-errors';
import { v4 as uuidv4 } from 'uuid';

import { convertSound } from '../../converters/convert_sound';
import { UPLOAD_PATH } from '../../paths';
import { extractMetadataFromSound } from '../../utils/extract_metadata_from_sound';
import { Sound, SoundPeak } from '../../models';
import Log4js from 'log4js';
// const logger = Log4js.getLogger();
// logger.level = "debug"; //これがないと表示されない
// 変換した音声の拡張子
const EXTENSION = 'mp3';
const AudioContext = require('web-audio-api').AudioContext
const _ = require('lodash');
const router = Router();

const getPeaks = (left, right) => {
  const leftData = _.map(left, Math.abs);
  // 右の音声データの絶対値を取る
  const rightData = _.map(right, Math.abs);

  // 左右の音声データの平均を取る
  const normalized = _.map(_.zip(leftData, rightData), _.mean);
  // 100 個の chunk に分ける
  const chunks = _.chunk(normalized, Math.ceil(normalized.length / 100));
  // chunk ごとに平均を取る
  const peaksO = _.map(chunks, _.mean);
  // chunk の平均の中から最大値を取る
  const maxO = _.max(peaksO);
  // console.log('{value: {maxO, peaksO}}', {value: {maxO, peaksO}})
  return {maxO, peaksO}
}

router.post('/sounds', async (req, res) => {
  if (req.session.userId === undefined) {
    throw new httpErrors.Unauthorized();
  }
  if (Buffer.isBuffer(req.body) === false) {
    throw new httpErrors.BadRequest();
  }

  const soundId = uuidv4();
  const { artist, title } = await extractMetadataFromSound(req.body);
  const soundData = req.body;
  const audioCtx = new AudioContext();
  const buffer = await new Promise((resolve, reject) => {
    audioCtx.decodeAudioData(soundData.slice(0), resolve, reject);
  })
  const get = getPeaks(buffer.getChannelData(0), buffer.getChannelData(1))
  const output = [];
  const peakMax = get.maxO
  for (let j = 0; j < get.peaksO.length; j++) {
    const peak = get.peaksO[j];
    output.push({soundId: soundId, ratio: peak/peakMax, index: j})
  }

  const converted = await convertSound(req.body, {
    // 音声の拡張子を指定する
    extension: EXTENSION,
  });

  // await Sound.create({
  //   artist: artist,
  //   id: soundId,
  //   title: title
  // },
  // {
  //   include: [{ association: 'soundPeak'}],
  // })
  // await SoundPeak.bulkCreate(output, {logging: true})

  const filePath = path.resolve(UPLOAD_PATH, `./sounds/${soundId}.${EXTENSION}`);
  await fs.writeFile(filePath, converted);

  return res.status(200).type('application/json').send({ artist, id: soundId, title, soundPeak: output });
});

export { router as soundRouter };
