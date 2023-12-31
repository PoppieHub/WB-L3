import {RequestEvent, SendEvent} from "../models";

export class RequestService {
    // Отправка события на сервер
    static async _send(data:RequestEvent) {
        const sendData: SendEvent = {
            type: data.type,
            payload: data.payload,
            timestamp: new Date().getTime()
        };

        return fetch('/api/sendEvent', {
            method: 'POST',
            body: JSON.stringify(sendData)
        });
    }

    // Проверка на пустоту
    static _isEmpty(field: any): boolean {
        if (!field) return true;

        if (Array.isArray(field) || typeof field === 'string') {
            return field.length === 0;
        }

        if (typeof field === 'object' && field !== null) {
            return Object.keys(field).length === 0;
        }

        return false;
    }
}