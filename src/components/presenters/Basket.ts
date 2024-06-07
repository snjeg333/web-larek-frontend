import { BASKET_OPEN } from '../../utils/events';
import { cloneTemplate, ensureElement } from '../../utils/utils';
import { AppState } from '../AppState';
import { IBasketView } from '../views/Basket';
import { CardView } from '../views/Card';

const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');

export class BasketPresenter {
	constructor(protected view: IBasketView, protected model: AppState) {
		model.onChanges(BASKET_OPEN, () => {
			this.openBasket();
		});

		view.addOrderButtonHandler(() => {
			this.model.order.setOrderItems(this.model.basket.items);
			this.model.order.openOrderForm();
		});
	}

	openBasket() {
		this.model.modal.open({
			content: this.view.render({
				list: this.createBasketCards(),
				price: this.model.getBasketTotal(),
			}),
		});
	}

	createBasketCards() {
		return this.model.basket.items.map((id, index) => {
			const product = this.model.products.items[id];
			const card = new CardView(cloneTemplate(cardBasketTemplate));
			card.addButtonHandler(() => {
				this.model.basket.remove(product.id);
				this.openBasket();
			});
			return card.render({ ...product, index: index + 1 });
		});
	}
}
