import { bem, ensureElement } from '../../utils/utils';
import { View } from '../base/View';

export interface IPageData extends View<IPageData> {
	counter: number;
	catalog: HTMLElement[];
	locked: boolean;

	addOpenBasketHandler(handler: () => void): void;
}

export class PageView extends View<IPageData> implements IPageData {
	protected _counter: HTMLElement;
	protected _catalog: HTMLElement;
	protected _wrapper: HTMLElement;
	protected _basket: HTMLElement;

	constructor(protected container: HTMLElement) {
		super(container);

		this._counter = ensureElement<HTMLElement>(
			bem('header', 'basket-counter').class
		);
		this._catalog = ensureElement<HTMLElement>(bem('gallery').class);
		this._wrapper = ensureElement<HTMLElement>(bem('page', 'wrapper').class);
		this._basket = ensureElement<HTMLElement>(bem('header', 'basket').class);
	}

	addOpenBasketHandler(handler: () => void) {
		this._basket.addEventListener('click', handler);
	}

	set counter(value: number) {
		this.setText(this._counter, String(value));
	}

	set catalog(items: HTMLElement[]) {
		this._catalog.replaceChildren(...items);
	}

	set locked(value: boolean) {
		this.toggleClass(
			this._wrapper,
			bem('page', 'wrapper', 'locked').name,
			value
		);
	}
}
