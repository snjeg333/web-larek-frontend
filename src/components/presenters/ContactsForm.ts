import { CONTACTS_FORM_OPEN, CONTACTS_FORM_UPDATE } from '../../utils/events';
import { AppState } from '../AppState';
import { larekApi } from '../LarekAPI';
import { Presenter } from '../base/Presenter';
import { ContactsFormView } from '../views/ContactsForm';

export class ContactsFormPresenter extends Presenter {
	constructor(protected view: ContactsFormView, protected model: AppState) {
		super(view, model);

		view.addInputChangeHandler((field, value) => {
			if (field === 'email') {
				model.order.setEmail(value);
			}
			if (field === 'phone') {
				model.order.setPhone(value);
			}
		});

		view.addSubmitHandler(() => {
			larekApi
				.orderProducts(this.model.order, this.model.getOrderTotal())
				.then(() => {
					model.basket.clear();
					model.order.openSuccessForm();
				});
		});

		model.onChanges(CONTACTS_FORM_OPEN, () => {
			model.order.resetValidation();
			if (model.order.phone || model.order.email) {
				model.order.updateContactsForm();
			}

			model.modal.open({
				content: view.render({
					errors: model.order.errors,
					valid: model.order.valid,
				}),
			});
		});

		model.onChanges(CONTACTS_FORM_UPDATE, () => {
			view.render({
				email: model.order.email,
				phone: model.order.phone,
				errors: model.order.errors,
				valid: model.order.valid,
			});
		});

	}
}
