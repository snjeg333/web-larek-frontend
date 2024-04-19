export interface IProduct {
	id: string;
	title: string;
	category?: string;
	description?: string;
	image?: string;
	price: number | null;
}

export interface IAppState {
	catalog: IProduct[];
	basketList: IProduct[];
	preview: string | null;
	order: IOrder | null;
	loading: boolean;
}

export interface IOrderForm {
	payment?: string;
	email?: string;
	phone?: string;
	address?: string;
	total?: number | string;
}

export interface ICard {
	index: number;
	title: string;
	price: string;
	description: string;
	category: string;
	image: string;
	button: string;
}

export interface IOrder extends IOrderForm {
	items: string[];
}

export type FormErrors = Partial<Record<keyof IOrder, string>>;
