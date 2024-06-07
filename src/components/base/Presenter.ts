import { IModel } from './Model';
import { View } from './View';

export abstract class Presenter {
	constructor(protected view: View<unknown>, protected model: IModel) {}
}
