import { bem, ensureElement } from '../../utils/utils';
import { View } from '../base/View';

interface ISuccess {
	total: number;
	closeSuccessButtonHandler(handler: () => void): void;
}

export class SuccessView extends View<ISuccess> {
	protected _close: HTMLButtonElement;
	protected _total: HTMLElement;

	constructor(container: HTMLElement) {
		super(container);

		this._close = ensureElement<HTMLButtonElement>(
			bem('order-success', 'close').class,
			container
		);
		this._total = ensureElement<HTMLElement>(
			bem('order-success', 'description').class,
			container
		);
	}

	set total(total: string) {
		this.setText(this._total, 'Списано ' + total + ' синапсов');
	}

	closeSuccessButtonHandler(handler: () => void) {
		this._close.addEventListener('click', handler);
	}
}
