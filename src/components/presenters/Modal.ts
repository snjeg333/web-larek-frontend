import {
	MODAL_CLOSE,
	MODAL_OPEN,
	OpenModalEventData,
} from '../../utils/events';
import { AppState } from '../AppState';
import { Presenter } from '../base/Presenter';
import { IModalView } from '../views/Modal';

export class ModalPresenter extends Presenter {
	constructor(protected view: IModalView, protected model: AppState) {
		super(view, model);
		view.addCloseHandler(() => this.model.closeModal());

		model.onChanges<OpenModalEventData>(MODAL_OPEN, (data) => {
			this.view.render({ ...data, visibility: true });
		});

		model.onChanges(MODAL_CLOSE, () => {
			this.view.render({ visibility: false });
		});
	}
}
