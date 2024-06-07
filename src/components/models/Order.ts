import { PaymentType, ProductId } from '../../types';
import {
	openContactsFormEventCreator,
	openOrderFormEventCreator,
	updateOrderFromEventCreator,
	updateContactsFromEventCreator,
	openSuccessEventCreator,
} from '../../utils/events';
import { Model } from '../base/Model';

export interface IOrder {
	phone: string;
	email: string;
	items: ProductId[];
	address: string;
	paymentType: PaymentType | null;
	errors?: string[];
	valid?: boolean;
}

export class Order extends Model<IOrder> implements IOrder {
	phone: string;
	email: string;
	items: ProductId[];
	address: string;
	paymentType: PaymentType;
	errors?: string[];
	valid?: boolean;

	openOrderForm() {
		this.emitChanges(openOrderFormEventCreator());
	}

	openContactsForm() {
		this.emitChanges(openContactsFormEventCreator());
	}

	openSuccessForm() {
		this.emitChanges(openSuccessEventCreator());
	}

	setOrderItems(items: ProductId[]) {
		this.items = items;
	}

	setPaymentType(paymentType: PaymentType) {
		this.paymentType = paymentType;
		this.updateOrderForm();
	}

	setAddress(address: string) {
		this.address = address;
		this.updateOrderForm();
	}

	setEmail(email: string) {
		this.email = email;
		this.updateContactsForm();
	}

	setPhone(phone: string) {
		this.phone = phone;
		this.updateContactsForm();
	}

	updateOrderForm() {
		const errors = [];
		this.address.length === 0 && errors.push('Введите адрес');
		!this.paymentType && errors.push('Выберете способ оплаты');
		this.errors = errors;
		this.valid = errors.length === 0;
		this.emitChanges(updateOrderFromEventCreator());
	}

	updateContactsForm() {
		const errors = [];
		const phoneRegex = /^(\+7|8)\s?\(?\d{3}\)?\s?\d{3}\s?\d{2}\s?\d{2}$/;
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

		if (this.phone.length === 0) {
			errors.push('Введите номер телефона');
		} else if (!phoneRegex.test(this.phone)) {
			errors.push('Некорректный формат телефона');
		}

		if (this.email.length === 0) {
			errors.push('Введите адрес электронной почты');
		} else if (!emailRegex.test(this.email)) {
			errors.push('Некорректный формат email');
		}

		this.errors = errors;
		this.valid = errors.length === 0;
		this.emitChanges(updateContactsFromEventCreator());
	}

	resetValidation() {
		this.errors = [];
		this.valid = false;
	}
}
