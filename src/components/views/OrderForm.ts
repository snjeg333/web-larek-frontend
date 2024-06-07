import { PaymentType } from '../../types';
import { bem, ensureElement } from '../../utils/utils';
import { Form } from './Form';

export interface IOrderForm {
	paymentType: PaymentType;
	address: string;

	addContactsButtonHandler(handler: () => void): void;
}

export class OrderFormView extends Form<IOrderForm> {
	protected _address: HTMLInputElement;
	protected _card: HTMLButtonElement;
	protected _cash: HTMLButtonElement;
	protected _button: HTMLButtonElement;

	constructor(protected container: HTMLFormElement) {
		super(container);

		this._address = ensureElement<HTMLInputElement>(
			'input[name=address]',
			container
		);
		this._card = ensureElement<HTMLButtonElement>(
			'button[name=card]',
			container
		);
		this._cash = ensureElement<HTMLButtonElement>(
			'button[name=cash]',
			container
		);
		this._button = ensureElement<HTMLButtonElement>(
			bem('order', 'button').class,
			container
		);
	}

	addContactsButtonHandler(handler: () => void) {
		this._button.addEventListener('click', handler);
	}

	addDeliveryTypeSelectorHandler(handler: (name: PaymentType) => void) {
		this._card.addEventListener('click', (e) => {
			handler((e.target as HTMLButtonElement).name as PaymentType);
		});
		this._cash.addEventListener('click', (e) => {
			handler((e.target as HTMLButtonElement).name as PaymentType);
		});
	}

	set paymentType(value: PaymentType) {
		this.toggleClass(
			this._card,
			bem('button', '', 'alt-active').name,
			value === 'card'
		);
		this.toggleClass(
			this._cash,
			bem('button', '', 'alt-active').name,
			value === 'cash'
		);
	}

	set address(value: string) {
		this._address.value = value;
	}
}
