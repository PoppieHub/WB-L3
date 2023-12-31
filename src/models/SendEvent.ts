import {RequestEvent} from "./RequestEvent";

export interface SendEvent extends RequestEvent {
    timestamp: number;
}