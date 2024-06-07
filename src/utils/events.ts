import { createEvent } from './utils';
import { ProductId } from '../types';

export const BASKET_CLEAR = 'basket/clear';
export const clearBasketEventCreator = () => createEvent(BASKET_CLEAR);

export const BASKET_OPEN = 'basket/open';
export const openBasketEventCreator = () => createEvent(BASKET_OPEN);

export const BASKET_REMOVE = 'basket/remove';
export const removeBasketEventCreator = () => createEvent(BASKET_REMOVE);

export const BASKET_ADD = 'basket/add';
export const addBasketEventCreator = () => createEvent(BASKET_ADD);

export const BASKET_UPDATE = 'basket/update';
export const updateBasketEventCreator = () => createEvent(BASKET_UPDATE);

export type OpenModalEventData = {
	content: HTMLElement;
};
export const MODAL_OPEN = 'modal/open';
export const openModalEventCreator = (data: OpenModalEventData) =>
	createEvent(MODAL_OPEN, data);

export const MODAL_CLOSE = 'modal/close';
export const closeModalEventCreator = () => createEvent(MODAL_CLOSE);

export const PRODUCTS_UPDATE = 'products/update';
export const updateProductsEventCreator = () => createEvent(PRODUCTS_UPDATE);

export type OpenPreviewEventData = {
	productId: ProductId;
};
export const PREVIEW_OPEN = 'preview/open';
export const openPreviewEventCreator = (data: OpenPreviewEventData) =>
	createEvent(PREVIEW_OPEN, data);

export const ORDER_FORM_OPEN = 'order-form/open';
export const openOrderFormEventCreator = () => createEvent(ORDER_FORM_OPEN);

export const ORDER_FORM_UPDATE = 'order-form/update';
export const updateOrderFromEventCreator = () => createEvent(ORDER_FORM_UPDATE);

export const CONTACTS_FORM_OPEN = 'contacts-form/open';
export const openContactsFormEventCreator = () =>
	createEvent(CONTACTS_FORM_OPEN);

export const CONTACTS_FORM_UPDATE = 'contacts-form/update';
export const updateContactsFromEventCreator = () =>
	createEvent(CONTACTS_FORM_UPDATE);

export const SUCCESS_OPEN = 'success/open';
export const openSuccessEventCreator = () => createEvent(SUCCESS_OPEN);

