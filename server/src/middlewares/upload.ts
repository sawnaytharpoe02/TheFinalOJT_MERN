import { Response, NextFunction } from 'express';
import path from 'path';

const _filename = path.resolve(
  path.dirname(require.resolve(process.argv[1])),
  process.argv[1]
);
const _dirname = path.dirname(_filename);

const uploadSingleFile = (req: any, res: Response, next: NextFunction) => {
  if (!req.files) {
    return res.status(400).json('No file was uploaded.');
  }

  console.log(_dirname);
  const file = req.files.img;
  const file_name = new Date().valueOf() + '_' + file.name;
  file.mv(`uploads/${file_name}`);
  req.body['img'] = file_name;
  next();
};

export { uploadSingleFile };
