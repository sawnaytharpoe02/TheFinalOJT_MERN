"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadSingleFile = void 0;
const path_1 = __importDefault(require("path"));
const _filename = path_1.default.resolve(path_1.default.dirname(require.resolve(process.argv[1])), process.argv[1]);
const _dirname = path_1.default.dirname(_filename);
const uploadSingleFile = (req, res, next) => {
    if (!req.files) {
        return res.status(400).json('No file was uploaded.');
    }
    console.log(_dirname);
    const file = req.files.img;
    const file_name = new Date().valueOf() + '_' + file.name;
    file.mv(`uploads/${file_name}`);
    req.body['img'] = file_name;
};
exports.uploadSingleFile = uploadSingleFile;
