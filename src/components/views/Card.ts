import { Price, ProductCaregory } from '../../types';
import { categoryMapping } from '../../utils/constants';
import { bem, ensureElement } from '../../utils/utils';
import { View } from '../base/View';
import { IProduct } from '../models/Products';

export interface ICardView extends View<ICardView>, IProduct {
	buttonText: string;
	index: number;

	addButtonHandler(handler: () => void): void;
	addContainerHandler(handler: () => void): void;
}

export class CardView extends View<ICardView> implements ICardView {
	protected _title: HTMLElement;
	protected _image?: HTMLImageElement;
	protected _category?: HTMLElement;
	protected _description?: HTMLElement;
	protected _price: HTMLElement;
	protected _button?: HTMLButtonElement;
	protected _index?: HTMLButtonElement;

	constructor(protected container: HTMLElement) {
		super(container);

		this._title = ensureElement<HTMLElement>(
			bem('card', 'title').class,
			container
		);
		this._image = container.querySelector(bem('card', 'image').class);
		this._category = container.querySelector(bem('card', 'category').class);
		this._description = container.querySelector(bem('card', 'text').class);
		this._price = ensureElement<HTMLElement>(
			bem('card', 'price').class,
			container
		);
		this._button = container.querySelector(bem('card', 'button').class);
		this._index = container.querySelector(bem('basket', 'item-index').class);
	}

	addButtonHandler(handler: () => void) {
		this._button?.addEventListener('click', handler);
	}

	addContainerHandler(handler: () => void) {
		this.container.addEventListener('click', handler);
	}

	set buttonText(value: string) {
		this.setText(this._button, value);
	}

	set id(value: string) {
		this.container.dataset.id = value;
	}

	set title(value: string) {
		this.setText(this._title, value);
	}

	set image(value: string) {
		this.setImage(this._image, value, this.title);
	}

	set category(value: ProductCaregory) {
		Object.keys(categoryMapping).forEach(
			(key: keyof typeof categoryMapping) => {
				this.toggleClass(this._category, categoryMapping[key], key === value);
			}
		);
		this.setText(this._category, value);
	}

	set description(value: string) {
		this.setText(this._description, value);
	}

	set price(value: Price) {
		if (!value) {
			this.setText(this._price, `Бесценно`);
		} else {
			this.setText(this._price, `${value} синапсов`);
		}
	}

	set index(value: number) {
		this.setText(this._index, String(value));
	}
}
