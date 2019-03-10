import { config } from '../../config';
import { CacheKeys } from '../../constants';
import { UserSchema } from '../../schemas/user.schema';
import { User } from '../../models/user.model';


export async function updateUsers(users: User[]) {

    console.log(users[0].id)

    const u = await UserSchema.findOne({_id: users[0].id});
    console.log(u)

    delete users[0].id;


    return await UserSchema.replaceOne({_id: users[0].id}, users[0]);
}
