import { Response, NextFunction } from 'express';

const uploadSingleFile = (req: any, res: Response, next: NextFunction) => {
	if (!req.files) {
		return res.status(400).json('No file was uploaded.');
	}

	const file = req.files.img;
	const file_name = new Date().valueOf() + '_' + file.name;
	file.mv(`uploads/${file_name}`);
	req.body['img'] = file_name;
	next();
};

export { uploadSingleFile };
