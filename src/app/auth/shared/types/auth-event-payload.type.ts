import { User, LoginCredentials } from "../../../../../common/models/user.model";

export type AuthEventPayload = User | LoginCredentials;