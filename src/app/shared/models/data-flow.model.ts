import { UIEventPayload } from "../types/ui-event-payload.type";

export type DataFlow = {
    dataStream?: Function,
    action: any,
    payloadProp: string
    payload?: UIEventPayload,
    route?: string,
}