import { mongoose } from '../extentions/mongoose';

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    username: { type: String, unique: true },
    email: { type: String, unique: true },
    password: String,
    roles: [String],
    token: String
});

export const UserSchema = mongoose.model('User', userSchema);
