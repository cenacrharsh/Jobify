import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import cloudinary from 'cloudinary';

import User from '../models/UserModel.js';
import Job from '../models/JobModel.js';
import { formatImage } from '../middleware/multerMiddleware.js';

export const getCurrentUser = async (req, res) => {
    const user = await User.findOne({
        _id: new mongoose.Types.ObjectId(req.user.userId),
    });
    const userWithoutPassword = user.toJSON();

    res.status(StatusCodes.OK).json({ user: userWithoutPassword });
};

export const getApplicationStats = async (req, res) => {
    const users = await User.countDocuments();

    const jobs = await Job.countDocuments();

    res.status(StatusCodes.OK).json({ users, jobs });
};

export const updateUser = async (req, res) => {
    //* remove password if present in req body
    const newUser = { ...req.body };
    delete newUser.password;

    if (req.file) {
        //* format the file recieved in buffer format before uploading to cloudinary
        const file = formatImage(req.file);

        const response = await cloudinary.v2.uploader.upload(file);

        newUser.avatar = response.secure_url;
        newUser.avatarPublicId = response.public_id;
    }

    const updatedUser = await User.findByIdAndUpdate(req.user.userId, newUser); //* the old user document is being returned

    //* remove old image from cloudinary
    if (req.file && updatedUser.avatarPublicId) {
        await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId);
    }

    res.status(StatusCodes.OK).json({ msg: 'updated user' });
};
