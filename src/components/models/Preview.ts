import { ProductId } from '../../types';
import {
	OpenPreviewEventData,
	openPreviewEventCreator,
} from '../../utils/events';
import { Model } from '../base/Model';

export interface IPreview {
	productId: ProductId | null;
}

export class Preview extends Model<IPreview> implements IPreview {
	productId: string;

	open(data: OpenPreviewEventData) {
		this.productId = data.productId;
		this.emitChanges(openPreviewEventCreator(data));
	}
}
