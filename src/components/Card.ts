import { Component } from './base/Component';
import { ICard } from '../types';
import { ensureElement } from '../utils/utils';

interface ICardActions {
	onClick: (event: MouseEvent) => void;
}

export class Card extends Component<ICard> {
	protected _category?: HTMLElement;
	protected _title: HTMLElement;
	protected _image?: HTMLImageElement;
	protected _price: HTMLElement;

	constructor(protected blockName: string, container: HTMLElement) {
		super(container);

		this._title = ensureElement<HTMLElement>(`.${blockName}__title`, container);
		this._price = ensureElement<HTMLImageElement>(
			`.${blockName}__price`,
			container
		);
	}

	//Геттер и сеттер для установки и получения идентификатора карточки
	set id(value: string) {
		this.container.dataset.id = value;
	}

	get id(): string {
		return this.container.dataset.id || '';
	}

	//Геттер и сеттер для установки и получения заголовка карточки
	set title(value: string) {
		this.setText(this._title, value);
	}

	get title(): string {
		return this._title.textContent || '';
	}

	//Сеттер для установки изображения карточки
	set image(value: string) {
		this.setImage(this._image, value, this.title);
	}

	//Сеттер для установки цены карточки
	set price(value: string) {
		this.setText(this._price, value);
	}

	categoryColor(value: string): string {
		switch (value) {
			case 'софт-скил':
				return 'card__category_soft';
			case 'хард-скил':
				return 'card__category_hard';
			case 'кнопка':
				return 'card__category_button';
			case 'дополнительное':
				return 'card__category_additional';
			default:
				return 'card__category_other';
		}
	}
	//Сеттер для установки категории карточки
	set category(value: string) {
		this.setText(this._category, value);
		this.toggleClass(this._category, this.categoryColor(value));
	}
}

//отображает элемент в каталоге карточек
export class CardCatalogItem extends Card {
	protected _category?: HTMLElement;
	protected _image?: HTMLImageElement;

	constructor(
		protected blockName: string,
		container: HTMLElement,
		actions?: ICardActions
	) {
		super(blockName, container);

		this._category = ensureElement<HTMLElement>(
			`.${blockName}__category`,
			container
		);
		this._image = ensureElement<HTMLImageElement>(
			`.${blockName}__image`,
			container
		);

		container.addEventListener('click', actions.onClick);
	}
}

//создание превью-карт
export class CardPreview extends Card {
	protected _button: HTMLButtonElement;
	protected _description: HTMLElement;
	protected _image: HTMLImageElement;

	constructor(
		protected blockName: string,
		container: HTMLElement,
		actions?: ICardActions
	) {
		super(blockName, container);

		this._category = ensureElement<HTMLElement>(
			`.${blockName}__category`,
			container
		);
		this._description = ensureElement<HTMLElement>(
			`.${blockName}__text`,
			container
		);
		this._button = container.querySelector(`.${blockName}__button`);
		this._image = ensureElement<HTMLImageElement>(
			`.${blockName}__image`,
			container
		);

		if (actions?.onClick) {
			if (this._button) {
				this._button.addEventListener('click', actions.onClick);
			} else {
				container.addEventListener('click', actions.onClick);
			}
		}
	}

	set description(value: string) {
		this.setText(this._description, value);
	}

	set button(value: string) {
		this.setText(this._button, value);
	}
}

//отображение списка элементов в интерфейсе пользователя
export class CardListItem extends Card {
	protected _button?: HTMLButtonElement;
	protected _index: HTMLElement;

	constructor(
		protected blockName: string,
		container: HTMLElement,
		actions?: ICardActions
	) {
		super(blockName, container);

		this._button = container.querySelector(`.${blockName}__button`);
		this._index = ensureElement<HTMLElement>('.basket__item-index', container);

		this._button.addEventListener('click', actions.onClick);
	}

	set index(indexItem: string) {
		this._index.textContent = indexItem;
	}
}
