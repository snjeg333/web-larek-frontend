import { SUCCESS_OPEN } from '../../utils/events';
import { AppState } from '../AppState';
import { Presenter } from '../base/Presenter';
import { SuccessView } from '../views/Success';

export class SuccessPresenter extends Presenter {
	constructor(protected view: SuccessView, protected model: AppState) {
		super(view, model);

		model.onChanges(SUCCESS_OPEN, () => {
			model.modal.open({
				content: view.render({
					total: this.model.getOrderTotal(),
				}),
			});
		});

		view.closeSuccessButtonHandler(() => {
			this.model.modal.close();
		});
	}
}
