import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UsersState } from "./users.reducers";

import * as fromUser from './users.reducers';
import { PageQuery } from "./users.actions";

export const selectUsersState = createFeatureSelector<UsersState>('users');

export const selectUserById = (userId: string) => createSelector(
    selectUsersState,
    usersState => usersState ? usersState.entities[userId] : null
)

export const selectAllUsers = createSelector(
    selectUsersState,
    fromUser.selectAll
)

export const allUsersLoaded = createSelector(
    selectUsersState,
    usersState => usersState.allUsersLoaded
)

export const selectUsersPage = (page: PageQuery) => createSelector(
    selectAllUsers,
    allUsers => {

        const start = page.pageIndex * page.pageSize,
            end = start + page.pageSize;

        return allUsers.slice(start, end);
    }
)