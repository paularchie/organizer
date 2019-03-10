import { AuthService } from "../shared/services/auth.service";
import { Login, Logout } from "./state/auth.actions";
import { AuthEventTypes } from "./shared/enums/auth-event-types.enum";
import { DataFlowMap } from "../shared/models/data-flow-map.model";

export const AuthDataFlowMap: DataFlowMap = {
    [AuthEventTypes.GetUserOnLoad]: {
        dataStream: AuthService.getUser,
        action: Login,
        payloadProp: 'user',
    },
    [AuthEventTypes.Login]: {
        dataStream: AuthService.login,
        action: Login,
        route: '/notes',
        payloadProp: 'user',
    },
    [AuthEventTypes.Logout]: {
        dataStream: AuthService.logout,
        action: Logout,
        route: '/login',
        payloadProp: 'user'
    },
    [AuthEventTypes.Signup]: {
        dataStream: AuthService.signUp,
        action: Login,
        route: '/notes',
        payloadProp: 'user',
    },
    [AuthEventTypes.LoginAsUser]: {
        dataStream: AuthService.loginAsUser,
        action: Login,
        route: '/notes',
        payloadProp: 'user',
    }
}