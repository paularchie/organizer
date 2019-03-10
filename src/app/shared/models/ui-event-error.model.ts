import { AuthErrorTypes } from "../../auth/shared/enums/auth-error-types.enum";

export interface UIEventError {
    type: AuthErrorTypes,
    payload: any
}