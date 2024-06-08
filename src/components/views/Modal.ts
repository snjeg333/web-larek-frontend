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
	protected _modalContainer: HTMLElement;

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
		this._modalContainer = ensureElement<HTMLElement>(
			bem('modal', 'container').class,
			container
		);

		this._modalContainer.addEventListener('click', (e) => e.stopPropagation());
	}

	addCloseHandler(handler: () => void) {
		const closeHandle = () => {
			this.visibility = false;
			handler();
		};

		this.container.addEventListener('click', closeHandle);
		this._closeButton.addEventListener('click', closeHandle);
		this._content.replaceChildren(null);
	}

	set content(value: HTMLElement) {
		this._content.replaceChildren(value);
	}

	set visibility(value: boolean) {
		this.toggleClass(this.container, bem('modal', null, 'active').name, value);
	}
}
