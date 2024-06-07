import { Price, ProductCaregory, ProductId } from '../../types';
import {
	OpenModalEventData,
	openModalEventCreator,
	updateProductsEventCreator,
} from '../../utils/events';
import { Model } from '../base/Model';

export interface IProduct {
	id: ProductId;
	title: string;
	price: Price;
	category: ProductCaregory;
	description: string;
	image: string;
}

interface IProducts {
	ids: ProductId[];
	items: Record<ProductId, IProduct>;
}

export class Products extends Model<IProducts> implements IProducts {
	ids: string[];
	items: Record<string, IProduct>;

	setProducts(products: IProduct[]) {
		this.items = products.reduce<Record<ProductId, IProduct>>((acc, item) => {
			acc[item.id] = item;
			return acc;
		}, {});
		this.ids = products.map(({ id }) => id);
		this.emitChanges(updateProductsEventCreator());
	}

	openPreview(data: OpenModalEventData) {
		this.emitChanges(openModalEventCreator(data));
	}
}
