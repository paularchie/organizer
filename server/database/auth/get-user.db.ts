import { UserSchema } from '../../schemas/user.schema';

export async function getUserById(_id: string) {

    return await UserSchema.findOne({ _id });
}

export async function getUserByEmail(email: string) {

    return await UserSchema.findOne({ email });
}

export async function getUser(key: any) {
// console.log('user', await UserSchema.findOne({ [key.prop]: key.value }))
    // get user by any property and value
    return await UserSchema.findOne({ [key.prop]: key.value });
}
