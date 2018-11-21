import * as passwordValidator from 'password-validator';

const schema = new passwordValidator();

schema
    .is().min(8)                                    // Minimum length 8
    .has().uppercase()                              // Must have uppercase letters
    .has().lowercase()                              // Must have lowercase letters
    .has().digits()                                 // Must have digits
    .has().not().spaces()                           // Should not have spaces
    .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

export function validatePassword(password: string) {
    return schema.validate(password, { list: true });
}
