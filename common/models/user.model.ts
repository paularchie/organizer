export interface User {
    firstName?: string;
    lastName?: string;
    username?: string;
    email?: string;
    id?: string;
    roles?: string[];
    token?: string;
}

export interface NewUser extends User {
    password: string;
    confirmPassword: string;
}
