"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadSingleFile = void 0;
const uploadSingleFile = (req, res, next) => {
    if (!req.files) {
        return res.status(400).json('No file was uploaded.');
    }
    const file = req.files.img;
    const file_name = new Date().valueOf() + '_' + file.name;
    file.mv(`uploads/${file_name}`);
    req.body['img'] = file_name;
    next();
};
exports.uploadSingleFile = uploadSingleFile;
