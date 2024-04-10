export interface IProductItem {
    id: string;
    title: string;
    category: string;
    description: string;
    image: string;
    price: number | null;
}

export interface IAppState {
    catalog: IProductItem[];
    basket: string[];
    preview: string | null;
    order: IOrder | null;
}

export interface IOrderForm {
    payment: string;
    email: string;
    phone: string;
    address: string;
    total: number;
    items: string[];
}

export interface IOrder extends IOrderForm {
    items: string[];
}