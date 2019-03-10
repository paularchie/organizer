import { FormErrorTypes } from "./form-error-types.enum";

const PASSWORD_ERROR_MESSAGES = {
    min: 'The minimum length is 8 characters',
    uppercase: 'At least one upper case character',
    lowercase: 'At least one lower case character',
    digits: 'At least one numeric character',
    'err_user': 'Could not create user',
    spaces: 'Password cannot contain any spaces'
};

export const FormErrorCodeMap = {
    [FormErrorTypes.required]: 'The field is required',
    [FormErrorTypes.email]: 'Invalid email address',
    [FormErrorTypes.incorrectCredentials]: 'Incorrect Credentials',
    [FormErrorTypes.passwordSecurity]: PASSWORD_ERROR_MESSAGES,
    [FormErrorTypes.duplicateEmail]: 'This email is already taken',
    [FormErrorTypes.duplicateUsername]: 'This username is already taken',
    [FormErrorTypes.passwordMatch]: 'Password doesn\'t match'

};