import { NewUser } from '../../models/user.model';
import { UserSchema } from '../../schemas/user.schema';
import { UserRoles } from '../../constants';


export async function createUser(user: NewUser) {

    return new UserSchema({
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        password: user.password,
        roles: [UserRoles.USER, UserRoles.ADMIN]
    }).save();
}
