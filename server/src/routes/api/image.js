import { promises as fs } from 'fs';
import path from 'path';

import Router from 'express-promise-router';
import httpErrors from 'http-errors';
import { v4 as uuidv4 } from 'uuid';

import { convertImage } from '../../converters/convert_image';
import { UPLOAD_PATH } from '../../paths';
// import Log4js from 'log4js';
// const logger = Log4js.getLogger();
// logger.level = "debug"; //これがないと表示されない
// 変換した画像の拡張子
const EXTENSION = 'webp';

const router = Router();

router.post('/images', async (req, res) => {
  if (req.session.userId === undefined) {
    throw new httpErrors.Unauthorized();
  }
  if (Buffer.isBuffer(req.body) === false) {
    throw new httpErrors.BadRequest();
  }
  const imageId = uuidv4();

  const checkImages = () => {
    // 1つに分かれる,2つに分かれる,3つに分かれる,4つに分かれるで画像のサイズが変わる
  }

  const converted = await convertImage(req.body, {
    // 画像の拡張子を指定する
    extension: EXTENSION,
    // 画像の縦サイズを指定する (undefined は元画像に合わせる)
    height: 477,
    // 画像の横サイズを指定する (undefined は元画像に合わせる)
    width: undefined,
  });

  const filePath = path.resolve(UPLOAD_PATH, `./images/${imageId}.${EXTENSION}`);
  await fs.writeFile(filePath, converted);

  return res.status(200).type('application/json').send({ id: imageId });
});

export { router as imageRouter };
