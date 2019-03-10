import { createSelector } from "@ngrx/store";

export const selectAuthState = state => state.auth;

export const isLoggedIn = createSelector(
    selectAuthState,
    auth => auth.isLoggedIn
);

export const currentUser = createSelector(
    selectAuthState,
    auth => auth.user
);

export const isLoggedOut = createSelector(
    isLoggedIn,
    loggedIn => !loggedIn
);