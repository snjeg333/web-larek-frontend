import { OpenPreviewEventData, PREVIEW_OPEN } from '../../utils/events';
import { AppState } from '../AppState';
import { ICardView } from '../views/Card';
import { ProductId } from '../../types';

export class PreviewPresenter {
	constructor(protected view: ICardView, protected model: AppState) {
		model.onChanges<OpenPreviewEventData>(PREVIEW_OPEN, ({ productId }) => {
			this.openPreview(productId);
		});

		this.view.addButtonHandler(() => {
			const currentProductId = this.model.preview.productId;
			const isAlreadyInBasket = this.model.basket.items.find(
				(id) => id === currentProductId
			);

			if (isAlreadyInBasket) {
				this.model.basket.remove(currentProductId);
			} else {
				this.model.basket.add(currentProductId);
			}
			
			this.openPreview(currentProductId);
		});
	}

	openPreview(id: ProductId) {
		const product = this.model.products.items[id];
		const isAlreadyInBasket = this.model.basket.items.find(
			(id) => id === product.id
		);

		this.model.products.openPreview({
			content: this.view.render({
				...product,
				buttonText: isAlreadyInBasket ? 'Убрать из корзины' : 'В корзину',
			}),
		});
	}
}
