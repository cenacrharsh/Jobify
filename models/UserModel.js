import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
        name: String,

        email: String,

        password: String,

        lastName: {
            type: String,
            default: 'lastName',
        },

        location: {
            type: String,
            default: 'my city',
        },

        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
        },

        avatar: String,

        avatarPublicId: String,
    },
    {
        timestamps: true,
    },
);

//! instance method (static methods are different and are available on entire model)
UserSchema.methods.toJSON = function () {
    let obj = this.toObject(); //* transform user document to js object

    delete obj.password;

    return obj;
};

export default mongoose.model('Users', UserSchema);
