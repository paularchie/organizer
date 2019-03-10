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

// Duplicate the ID field.
userSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
userSchema.set('toJSON', {
    virtuals: true
});

export const UserSchema = mongoose.model('User', userSchema);
