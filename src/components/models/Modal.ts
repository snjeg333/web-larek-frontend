import {
	OpenModalEventData,
	closeModalEventCreator,
	openModalEventCreator,
} from '../../utils/events';
import { Model } from '../base/Model';

export class Modal extends Model<unknown> {
	open(data: OpenModalEventData) {
		this.emitChanges(openModalEventCreator(data));
	}

	close() {
		this.emitChanges(closeModalEventCreator());
	}
}
