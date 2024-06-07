import { bem, ensureElement } from '../../utils/utils';
import { Form } from './Form';

export interface IContactsForm {
	phone: string;
	email: string;
}

export class ContactsFormView extends Form<IContactsForm> {
	protected _email: HTMLInputElement;
	protected _phone: HTMLInputElement;
	protected _button: HTMLButtonElement;

	constructor(protected container: HTMLFormElement) {
		super(container);

		this._email = ensureElement<HTMLInputElement>(
			'input[name=email]',
			container
		);
		this._phone = ensureElement<HTMLInputElement>(
			'input[name=phone]',
			container
		);
		this._button = ensureElement<HTMLButtonElement>(
			bem('button').class,
			container
		);
	}


	set phone(value: string) {
		this.setValue(this._phone, value);
	}

	set email(value: string) {
		this.setValue(this._email, value);
	}

}
