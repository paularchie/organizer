import { config } from '../../config';
import { CacheKeys } from '../../constants';
import { UserSchema } from '../../schemas/user.schema';
import { User } from '../../models/user.model';


export async function getUsers() {

    // get the entire collection of users, excluding the id and password, and cache it
    return await UserSchema.find({}, { _id: 0, password: 0 }).cache((CacheKeys.USER));
}
