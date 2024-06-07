import { bem, ensureElement } from '../../utils/utils';
import { View } from '../base/View';

export interface IModalView extends View<IModalView> {
	content: HTMLElement;
	visibility: boolean;

	addCloseHandler(handler: () => void): void;
}

export class ModalView extends View<IModalView> implements IModalView {
	protected _closeButton: HTMLButtonElement;
	protected _content: HTMLElement;

	constructor(protected container: HTMLElement) {
		super(container);

		this._closeButton = ensureElement<HTMLButtonElement>(
			bem('modal', 'close').class,
			container
		);
		this._content = ensureElement<HTMLElement>(
			bem('modal', 'content').class,
			container
		);

		const closeHandler = () => this.visibility = false;
		this._closeButton.addEventListener('click', closeHandler);
		this.container.addEventListener('click', closeHandler);
		this._content.addEventListener('click', (event) => event.stopPropagation());
	}

	addCloseHandler(handler: () => void) {
		this._closeButton.addEventListener('click', handler);
		this.container.addEventListener('click', handler);
	}

	set content(value: HTMLElement) {
		this._content.replaceChildren(value);
	}

	set visibility(value: boolean) {
		this.toggleClass(this.container, bem('modal', null, 'active').name, value);
	}
}
