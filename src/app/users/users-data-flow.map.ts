import { DataFlowMap } from '../shared/models/data-flow-map.model';
import { AllUsersLoaded, UserSaved } from './state/users.actions';
import { UsersService } from './services/users.service';
import { UsersEventTypes } from './models/enums/ui-users-event-types.enum';

export const UsersDataFlowMap: DataFlowMap = {
    [UsersEventTypes.UsersPageLoad]: {
        dataStream: UsersService.getUsers,
        action: AllUsersLoaded,
        payloadProp: 'users'
    },
    [UsersEventTypes.UpdateUsers]: {
        // dataStream: UsersService.updateUsers,
        action: UserSaved,
        payloadProp: 'user'
    }
}