"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const users_route_1 = __importDefault(require("./routes/users.route"));
const posts_route_1 = __importDefault(require("./routes/posts.route"));
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)('common'));
app.use((0, cors_1.default)());
const _filename = path_1.default.resolve(path_1.default.dirname(require.resolve(process.argv[1])), process.argv[1]);
const _dirname = path_1.default.dirname(_filename);
const public_dir = _dirname.slice(0, _dirname.lastIndexOf('\\dist'));
app.use('/images', express_1.default.static(path_1.default.join(public_dir, 'public/images')));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    },
});
const upload = (0, multer_1.default)({ storage });
app.post('/api/upload', upload.single('file'), (req, res) => {
    try {
        return res.status(200).json('File uploaded Successfully');
    }
    catch (err) {
        console.log(err);
    }
});
app.use('/api/auth', auth_route_1.default);
app.use('/api/users', users_route_1.default);
app.use('/api/posts', posts_route_1.default);
const PORT = process.env.PORT;
const options = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose_1.default
    .connect(process.env.MONGO_URL, options)
    .then(() => {
    console.log('connected to mongo database');
    app.listen(PORT, () => {
        console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
    });
})
    .catch((error) => {
    console.log(`${error}: did not connect`);
});
