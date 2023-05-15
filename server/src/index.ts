import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import fileUpload from 'express-fileupload';

import authRoute from './routes/auth.route';
import userRoute from './routes/users.route';
import postRoute from './routes/posts.route';

const app = express();
dotenv.config();

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));
app.use(cors());
app.use(fileUpload());
app.use(express.static('public'));

app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);

// mongo setup
const PORT = process.env.PORT;

const options = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose
	.connect(process.env.MONGO_URL!, options)
	.then(() => {
		console.log('connected to mongo database');
		app.listen(PORT, () => {
			console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
		});
	})
	.catch((error: any) => {
		console.log(`${error}: did not connect`);
	});
