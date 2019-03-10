import { UserRoles } from '../../../common/constants';
import { AuthErrorTypes } from '../auth/shared/enums/auth-error-types.enum';
import { User } from '../../../common/models/user.model';

export const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export { UserRoles };


export const ANONYMOUS_USER: User = {
    id: undefined,
    email: undefined,
};

export const UIUnknownError = {
    type: AuthErrorTypes.UnknownError,
    payload: null
}

