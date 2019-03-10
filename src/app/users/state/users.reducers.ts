import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { UsersActions, UsersActionTypes } from "./users.actions";
import { User } from "../../../../common/models/user.model";



export interface UsersState extends EntityState<User> {
    allUsersLoaded: boolean
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>();

export const initialUsersState: UsersState = adapter.getInitialState(
    { allUsersLoaded: false }
);

export function usersReducer(state = initialUsersState, action: UsersActions): UsersState {

    switch (action.type) {

        case UsersActionTypes.UsersLoaded:
            return adapter.addOne(action.payload.user, state);

        case UsersActionTypes.AllUsersLoaded:
            return adapter.addAll(action.payload.users, { ...state, allUsersLoaded: true });

        case UsersActionTypes.UserSaved:
            return adapter.updateOne(action.payload.user, state);
        default:
            return state;
    }
}

export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal
} = adapter.getSelectors();