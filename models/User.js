import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please provide name"],
            minLength: 2,
            maxLength: 20,
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Please provide email"],
            validate: {
                validator: validator.isEmail,
                message: "Please provide a valid email",
            },
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Please provide password"],
        },
        lastName: {
            type: String,
            trim: true,
            maxLength: 20,
            default: "lastName",
        },
        location: {
            type: String,
            trim: true,
            maxLength: 20,
            default: "my city",
        },
    },
    {
        timestamps: true,
    }
);

UserSchema.pre("save", async function () {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
    return jwt.sign({ userId: this._id }, "jwtSecret", { expiresIn: "1d" });
};

export default mongoose.model("User", UserSchema);
