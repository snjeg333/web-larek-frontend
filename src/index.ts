import { AppState } from './components/AppState';
import { EventEmitter } from './components/base/EventEmitter';
import { BasketPresenter } from './components/presenters/Basket';
import { ModalPresenter } from './components/presenters/Modal';
import { OrderFormPresenter } from './components/presenters/OrderForm';
import { ContactsFormPresenter } from './components/presenters/ContactsForm';
import { PagePresenter } from './components/presenters/Page';
import { PreviewPresenter } from './components/presenters/Preview';
import { BasketView } from './components/views/Basket';
import { CardView } from './components/views/Card';
import { ModalView } from './components/views/Modal';
import { OrderFormView } from './components/views/OrderForm';
import { ContactsFormView } from './components/views/ContactsForm';
import { PageView } from './components/views/Page';

import { cloneTemplate, ensureElement } from './utils/utils';

import './scss/styles.scss';
import { SuccessView } from './components/views/Success';
import { SuccessPresenter } from './components/presenters/Success';


const events = new EventEmitter();

const appState = new AppState(events);

const moadalElement = ensureElement<HTMLElement>('#modal-container');

const basketElement = cloneTemplate('#basket');

const previewElement = cloneTemplate('#card-preview');

const orderElement = cloneTemplate<HTMLFormElement>('#order');

const contactsElement = cloneTemplate<HTMLFormElement>('#contacts');

const successElement = cloneTemplate<HTMLFormElement>('#success');

new PagePresenter(new PageView(document.body), appState);
new ModalPresenter(new ModalView(moadalElement), appState);
new BasketPresenter(new BasketView(basketElement), appState);
new PreviewPresenter(new CardView(previewElement), appState);
new OrderFormPresenter(new OrderFormView(orderElement), appState);
new ContactsFormPresenter(new ContactsFormView(contactsElement), appState);
new SuccessPresenter(new SuccessView(successElement), appState);
