import { ProductData } from 'types';
import { genUUID } from '../utils/helpers';
import { RequestService } from './request.service';
import { EventTypes } from "../models";

export class AnalyticsService extends RequestService {

    constructor() {
        super();
    }

    // Отправка события о переходе по страницам
    static async onRoute(url: string): Promise<void> {
        await this._send({
            type: EventTypes.route,
            payload: {url: url}
        });
    };

    // Отправка события о просмотре продукта
    static async onViewProduct(productProperties: ProductData, secretKey: string): Promise<void> {
        await this._send({
            type: this._isEmpty(productProperties.log)
                ? EventTypes.viewCard
                : EventTypes.viewCardPromo,
            payload: {
                properties: {...productProperties},
                secretKey: secretKey
            }
        });
    };

    // Отправка события о добавлении продукта в корзину
    static async onAddToBasket(productProperties: ProductData): Promise<void> {
        await this._send({
            type: EventTypes.addToBasket,
            payload: {
                properties: {...productProperties}
            }
        });
    }

    // Отправка события оформление заказа
    static async onOrder(products: ProductData[]): Promise<void> {
        await this._send({
            type: EventTypes.purchase,
            payload: {
                orderId: genUUID(),
                totalPrice: products.reduce((acc, product) => acc += product.salePriceU, 0),
                productIds: products.map(product => product.id)
            }
        });
    }
}

