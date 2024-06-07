import { PaymentType } from '../../types';
import { ORDER_FORM_OPEN, ORDER_FORM_UPDATE } from '../../utils/events';
import { AppState } from '../AppState';
import { Presenter } from '../base/Presenter';
import { OrderFormView } from '../views/OrderForm';

export class OrderFormPresenter extends Presenter {
	constructor(protected view: OrderFormView, protected model: AppState) {
		super(view, model);

		view.addDeliveryTypeSelectorHandler((paymentType: PaymentType) => {
			model.order.setPaymentType(paymentType);
		});

		view.addInputChangeHandler((field, value) => {
			if (field === 'address') {
				model.order.setAddress(value);
			}
		});

		view.addContactsButtonHandler(() => {
			model.order.openContactsForm();
		});

		model.onChanges(ORDER_FORM_OPEN, () => {
			model.order.resetValidation();
			if (model.order.address || model.order.paymentType) {
				model.order.updateOrderForm();
			}

			model.modal.open({
				content: view.render({
					errors: model.order.errors,
					valid: model.order.valid,
				}),
			});
		});

		model.onChanges(ORDER_FORM_UPDATE, () => {
			view.render({
				address: model.order.address,
				paymentType: model.order.paymentType,
				errors: model.order.errors,
				valid: model.order.valid,
			});
		});
	}
}
