import { API_URL, CDN_URL } from '../utils/constants';
import { Api } from './base/Api';
import { IOrder } from './models/Order';
import { IProduct } from './models/Products';

export type ApiProductsListResponse<Type> = {
	total: number;
	items: Type[];
};

export interface ILarekApi {
	getProductsList(): Promise<ApiProductsListResponse<IProduct>>;
	orderProducts(products: IOrder, total: number): Promise<unknown>;
}

class LarekApi extends Api implements ILarekApi {
	readonly cdn: string;

	constructor(cdn: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
		this.cdn = cdn;
	}

	getProductsList(): Promise<ApiProductsListResponse<IProduct>> {
		return this.get('/product');
	}

	orderProducts(order: IOrder, total: number): Promise<unknown> {
		return this.post('/order', {
			email: order.email,
			phone: order.phone,
			items: order.items,
			address: order.address,
			payment: order.paymentType,
			total,
		});
	}
}

export const larekApi = new LarekApi(CDN_URL, API_URL);
