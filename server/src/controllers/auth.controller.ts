import User from '../models/User';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserCreate } from '../interface/user';

// USER REGISTER
const register = async (req: Request, res: Response) => {
	try {
		const { username, email, password } = req.body;
		//generate new password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		//create new user
		const user: UserCreate = {
			username,
			email,
			password: hashedPassword,
		};
		const newUser = new User(user);

		//save user and respond
		const savedUser = await newUser.save();
		res.status(201).json(savedUser);
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
};

// USER LOGIN
const login = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		if (!user) return res.status(404).json('user not found');

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!);
		delete user.password;

		res.status(200).json({ token, user });
	} catch (err: any) {
		res.status(500).json({ error: err.message });
	}
};

export { register, login };
