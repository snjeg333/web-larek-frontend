import { ProductId } from '../../types';
import {
	addBasketEventCreator,
	clearBasketEventCreator,
	openBasketEventCreator,
	removeBasketEventCreator,
	updateBasketEventCreator,
} from '../../utils/events';
import { Model } from '../base/Model';

export interface IBasket {
	items: ProductId[];
}

export class Basket extends Model<IBasket> implements IBasket {
	items: ProductId[];

	open() {
		this.emitChanges(openBasketEventCreator());
	}

	clear() {
		this.items = [];
		this.emitChanges(clearBasketEventCreator());
		this.emitChanges(updateBasketEventCreator());
	}

	remove(item: ProductId) {
		this.items = this.items.filter((id) => id !== item);
		this.emitChanges(removeBasketEventCreator());
		this.emitChanges(updateBasketEventCreator());
	}

	add(item: ProductId) {
		this.items.push(item);
		this.emitChanges(addBasketEventCreator());
		this.emitChanges(updateBasketEventCreator());
	}
}
