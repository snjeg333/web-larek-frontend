import { ensureElement } from '../../utils/utils';
import { View } from '../base/View';

interface IFormState {
	valid?: boolean;
	errors?: string[];
}

export class Form<T = object> extends View<IFormState> implements IFormState {
	protected _submit: HTMLButtonElement;
	protected _errors: HTMLElement;

	constructor(protected container: HTMLFormElement) {
		super(container);

		this._submit = ensureElement<HTMLButtonElement>(
			'button[type=submit]',
			this.container
		);
		this._errors = ensureElement<HTMLElement>('.form__errors', this.container);
	}

	addSubmitHandler(handler: () => void) {
		this.container.addEventListener('submit', (e: Event) => {
			e.preventDefault();
			handler();
		});
	}

	addInputChangeHandler(handler: (data: string, value: string) => void) {
		this.container.addEventListener('input', (e: InputEvent) => {
			const target = e.target as HTMLInputElement;
			const field = target.name;
			const value = target.value;

			handler(field, value);
		});
	}

	set valid(value: boolean) {
		this._submit.disabled = !value;
	}

	set errors(value: string[]) {
		this.setText(
			this._errors,
			value
				.map((error, index) => (index === 0 ? error : error.toLowerCase()))
				.join(', ')
		);
	}

	render(state: Partial<T> & IFormState) {
		const { valid = false, errors = [], ...inputs } = state;
		super.render({ valid, errors });
		Object.assign(this, state);
		return this.container;
	}
}
