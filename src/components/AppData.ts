import { Model } from './base/Model';
import {
	IProduct,
	IAppState,
	IOrder,
	IOrderForm,
	FormErrors,
} from '../types/index';

export class AppState extends Model<IAppState> {
	catalog: IProduct[];
	basketList: IProduct[] = [];
	preview: string | null;
	order: IOrder = {
		payment: '',
		address: '',
		email: '',
		phone: '',
		total: 0,
		items: [],
	};
	formErrors: FormErrors = {};
	buttonName: 'Купить' | 'Убрать из корзины';

	//проверяет наличие продукта в корзине по его названию.
	getButtonName(value: string): string {
		if (this.basketList.some((obj) => obj.title === value)) {
			this.buttonName = 'Убрать из корзины';
		} else {
			this.buttonName = 'Купить';
		}
		return this.buttonName;
	}

	// возвращает общее количество продуктов в корзине
	getTotal() {
		return this.basketList.length;
	}

	//вычисляет и возвращает общую стоимость всех продуктов в корзине
	getTotalPrice() {
		return this.basketList.reduce((a, b) => a + b.price, 0);
	}

	//устанавливает каталог продуктов
	setCatalog(items: IProduct[]) {
		this.catalog = items;
		this.emitChanges('items:changed', { catalog: this.catalog });
	}

	//устанавливает предпросмотр продукта
	setPreview(item: IProduct) {
		this.preview = item.id;
		this.emitChanges('preview:changed', item);
	}

	//очищает корзину
	clearBasket() {
		this.basketList = [];
	}

	//добавляет продукт в корзину
	addBasketList(item: IProduct) {
		this.basketList = [item, ...this.basketList];
	}

	//возвращает массив всех продуктов в корзине
	getBasketList(): IProduct[] {
		return this.basketList;
	}

	//удаляет продукт из корзины
	changeBasketList(id: string) {
		this.basketList = this.basketList.filter((item) => item.id !== id);
	}

	//устанавливает элементы заказа преобразуя массив устанавливая общую стоимость заказа
	setOrderItems() {
		this.order.items = this.basketList.map((item) => item.id);
		this.order.total = this.getTotalPrice();
	}

	//устанавливает значение поля заказа
	setOrderField(field: keyof IOrderForm, value: string) {
		this.order[field] = value;

		if (this.validateOrder()) {
			this.events.emit('order:ready', this.order);
		}
	}

	//устанавливает значение контактного поля
	setContactsField(field: keyof IOrderForm, value: string) {
		this.order[field] = value;

		if (this.validateContacts()) {
			this.events.emit('contacts:ready', this.order);
		}
	}

	//проверяет валидность данных заказа
	validateOrder() {
		const errors: typeof this.formErrors = {};
		if (!this.order.address) {
			errors.address = 'Необходимо указать адрес';
		}
		if (!this.order.payment) {
			errors.payment = 'Необходимо указать тип оплаты';
		}

		this.formErrors = errors;
		this.events.emit('formOrderErrors:change', this.formErrors);
		return Object.keys(errors).length === 0;
	}

	//проверяет валидность контактных данных
	validateContacts() {
		const errors: typeof this.formErrors = {};

		if (!this.order.email) {
			errors.email = 'Необходимо указать email';
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.order.email)) {
			errors.email = 'Некорректный формат email';
		}

		if (!this.order.phone) {
			errors.phone = 'Необходимо указать телефон';
		} else if (
			!/^(\+7|8)\s?\(?\d{3}\)?\s?\d{3}\s?\d{2}\s?\d{2}$/.test(this.order.phone)
		) {
			errors.phone = 'Некорректный формат телефона';
		}
		this.formErrors = errors;
		this.events.emit('formContactsErrors:change', this.formErrors);
		return Object.keys(errors).length === 0;
	}
}
