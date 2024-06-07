import { Price, ProductId } from '../types';
import { closeModalEventCreator } from '../utils/events';
import { IEventEmitter } from './base/EventEmitter';
import { Model } from './base/Model';
import { Basket } from './models/Basket';
import { Modal } from './models/Modal';
import { Order } from './models/Order';
import { Preview } from './models/Preview';
import { Products } from './models/Products';

export interface IStateData {
	basket: Basket;
	products: Products;
	order: Order;
	modal: Modal;
	preview: Preview;
}

export class AppState extends Model<IStateData> implements IStateData {
	basket: Basket;
	products: Products;
	order: Order;
	modal: Modal;
	preview: Preview;

	constructor(events: IEventEmitter) {
		super(
			{
				basket: new Basket({ items: [] }, events),
				products: new Products({ items: {}, ids: [] }, events),
				order: new Order(
					{
						email: '',
						items: [],
						phone: '',
						address: '',
						paymentType: null,
						errors: [],
					},
					events
				),
				modal: new Modal({}, events),
				preview: new Preview({ productId: null }, events),
			},
			events
		);
	}

	getBasketTotal() {
		let total: Price = 0;
		for (const id of this.basket.items) {
			const product = this.products.items[id];
			if (product && product.price === null) {
				return null;
			}
			total += product.price;
		}
		return total;
	}

	getOrderTotal() {
		return this.order.items.reduce(
			(acc, id) => acc + (this.products.items[id].price || 0),
			0 
		);
	}

	closeModal() {
		this.emitChanges(closeModalEventCreator());
	}
}
