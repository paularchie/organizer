import { AuthEventTypes } from '../../auth/shared/enums/auth-event-types.enum';
import { UsersEventTypes } from '../../users/models/enums/ui-users-event-types.enum';

export type UIEvent = AuthEventTypes | UsersEventTypes;