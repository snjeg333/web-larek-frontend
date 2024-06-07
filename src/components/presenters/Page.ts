import { CDN_URL } from '../../utils/constants';
import {
	BASKET_UPDATE,
	MODAL_CLOSE,
	MODAL_OPEN,
	PRODUCTS_UPDATE,
} from '../../utils/events';
import { cloneTemplate, ensureElement } from '../../utils/utils';
import { AppState } from '../AppState';
import { larekApi } from '../LarekAPI';
import { CardView } from '../views/Card';
import { IPageData } from '../views/Page';

const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');

export class PagePresenter {
	constructor(protected view: IPageData, protected model: AppState) {
		view.addOpenBasketHandler(() => {
			model.basket.open();
		});

		model.onChanges(PRODUCTS_UPDATE, () => {
			this.updateProducts();
		});

		model.onChanges(MODAL_OPEN, () => {
			this.view.locked = true;
		});

		model.onChanges(MODAL_CLOSE, () => {
			this.view.locked = false;
		});

		model.onChanges(BASKET_UPDATE, () => {
			this.view.render({ counter: this.model.basket.items.length });
		});

		larekApi
			.getProductsList()
			.then(({ items }) =>
				model.products.setProducts(
					items.map((item) => ({ ...item, image: CDN_URL + item.image }))
				)
			);
	}

	updateProducts() {
		const element = cloneTemplate(cardCatalogTemplate);

		if (!element) {
			return;
		}

		this.view.render({
			catalog: this.createGallery(),
		});
	}

	createGallery() {
		return this.model.products.ids.map((productId) => {
			const card = new CardView(cloneTemplate(cardCatalogTemplate));
			const product = this.model.products.items[productId];
			const element = card.render(product);
			card.addContainerHandler(() => {
				this.model.preview.open({ productId });
			});
			return element;
		});
	}
}
