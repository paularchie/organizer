import { UserRoles } from '../../../common/constants';

export const PASSWORD_ERROR_MESSAGES = {
    min: 'The minimum length is 8 characters',
    uppercase: 'At least one upper case character',
    lowercase: 'At least one lower case character',
    digits: 'At least one numeric character',
    'err_user': 'Could not create user',
    spaces: 'Password cannot contain any spaces'
};

export const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export { UserRoles };

