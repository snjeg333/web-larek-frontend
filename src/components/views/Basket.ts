import { Price } from '../../types';
import { bem, ensureElement } from '../../utils/utils';
import { View } from '../base/View';

export interface IBasketView extends View<IBasketView> {
	list: HTMLElement[];
	price: number;

	addOrderButtonHandler(handler: () => void): void;
}

export class BasketView extends View<IBasketView> implements IBasketView {
	protected _list: HTMLElement;
	protected _price: HTMLElement;
	protected _button: HTMLButtonElement;

	constructor(protected container: HTMLElement) {
		super(container);

		this._button = ensureElement<HTMLButtonElement>(
			bem('basket', 'button').class,
			container
		);
		this._price = ensureElement<HTMLElement>(
			bem('basket', 'price').class,
			container
		);
		this._list = ensureElement<HTMLElement>(
			bem('basket', 'list').class,
			container
		);
	}

	addOrderButtonHandler(handler: () => void) {
		this._button.addEventListener('click', handler);
	}

	set price(price: Price) {
		if (price !== null) {
			this.setText(this._price, price + ' синапсов');
		} else {
			this.setText(this._price, 'Бесценно');
			this.setDisabled(this._button, true);
		}
	}

	set list(items: HTMLElement[]) {
		this._list.replaceChildren(...items);
		this.setDisabled(this._button, !items.length);
	}
}
