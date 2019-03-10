import { Action } from "@ngrx/store";
import { Update } from "@ngrx/entity";
import { User } from "../../../../common/models/user.model";


export enum UsersActionTypes {
    UserRequested = '[View Users Page] User Requested',
    UsersLoaded = '[Users API] Users Loaded',
    FetchAllUsers = '[Users Home Page] Fetch All Users',
    AllUsersLoaded = '[Users API] All Users Loaded',
    UserSaved = 'User Saved',
    UsersPageRequested = '[Course Landing Page] Users Page Requested',
    UsersPageLoaded = '[Courses API] Users Page Loaded',
    UsersPageCancelled = '[Courses API] Users Page Cancelled'
}

export interface PageQuery {
    pageIndex: number;
    pageSize: number;
}

export class UsersPageRequested implements Action {
    readonly type = UsersActionTypes.UsersPageRequested;

    constructor(public payload: { userId: string, page: PageQuery }) { }
}

export class UserRequested implements Action {
    readonly type = UsersActionTypes.UserRequested;

    constructor(public payload: { userId: string/*, page: PageQuery */ }) { }

}

export class UsersPageLoaded implements Action {
    readonly type = UsersActionTypes.UsersPageLoaded;

    constructor(public payload: { Users: User[] }) { }
}

export class UserLoaded implements Action {
    readonly type = UsersActionTypes.UsersLoaded;

    constructor(public payload: { user: any }) { }
}

export class UsersPageCancelled implements Action {

    readonly type = UsersActionTypes.UsersPageCancelled;
}


export class FetchAllUsers implements Action {

    readonly type = UsersActionTypes.FetchAllUsers;
}

export class AllUsersLoaded implements Action {
    readonly type = UsersActionTypes.AllUsersLoaded;

    constructor(public payload: { users: User[] }) {

    }
}

export class UserSaved implements Action {
    readonly type = UsersActionTypes.UserSaved;

    constructor(public payload: { user: Update<User> }) { }
}

export type UsersActions =
    UserRequested
    | UserLoaded
    | FetchAllUsers
    | AllUsersLoaded
    | UserSaved
    | UsersPageRequested
    | UsersPageLoaded
    | UsersPageCancelled;





