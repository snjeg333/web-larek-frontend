import { Event, EventName, IEventEmitter, Subscriber } from './EventEmitter';

export interface IModel {
	events: IEventEmitter;
}

/**
 * Базовая модель, чтобы можно было отличить ее от простых объектов с данными
 */
export abstract class Model<T> implements IModel {
	events: IEventEmitter;

	constructor(data: T, events: IEventEmitter) {
		Object.assign(this, data);
		this.events = events;
	}

	/**
	 * Сообщить всем что модель поменялась
	 */
	emitChanges<T>(event: Event<T>): void {
		this.events.emit(event);
	}

	/**
	 * Добавить обработчик на событие
	 */
	onChanges<T>(eventName: EventName, callback: Subscriber<T>): void {
		this.events.on(eventName, callback);
	}

	/**
	 * Добавить обработчик на событие
	 */
	onChangesBatch(eventNames: EventName[], callback: Subscriber<unknown>): void {
		eventNames.forEach((eventName) => this.onChanges(eventName, callback));
	}
}
