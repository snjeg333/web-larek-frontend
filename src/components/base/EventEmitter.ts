export type EventName = string;
export type Subscriber<D> = (data: D) => void;
export type Event<D = undefined> = {
	name: string | RegExp;
	data?: D;
};
type EventMap = Map<EventName, Set<Subscriber<any>>>;

export interface IEventEmitter {
	on<T>(eventName: EventName, callback: (data: T) => void): void;
	off(eventName: EventName): void;
	off<T>(eventName: EventName, callback: Subscriber<T>): void;
	emit<T>(event: Event<T>): void;
	makeEmiter<T>(eventName: string, contextData?: Partial<T>): void;
}

export class EventEmitter implements IEventEmitter {
	private events: EventMap;

	constructor() {
		this.events = new Map();
	}

	/**
	 * Установить обработчик на событие
	 */
	on<T>(eventName: EventName, callback: Subscriber<T>) {
		if (!this.events.has(eventName)) {
			this.events.set(eventName, new Set());
		}
		this.events.get(eventName)?.add(callback);
	}

	/**
	 * Установить обработчик на события
	 */
	onBatch(eventNames: EventName[], callback: Subscriber<unknown>) {
		eventNames.forEach((eventName) => {
			this.on(eventName, callback);
		});
	}

	/**
	 * Снять все обработчики с события
	 */
	off(eventName: EventName): void;
	/**
	 * Снять обработчик с события
	 */
	off<T>(eventName: EventName, callback: Subscriber<T>): void;
	off<T>(eventName: EventName, callback?: Subscriber<T>) {
		if (this.events.has(eventName)) {
			if (!callback) {
				this.events.get(eventName)?.clear();
				this.events.delete(eventName);
			} else {
				this.events.get(eventName)?.delete(callback);
				if (this.events.get(eventName)?.size === 0) {
					this.events.delete(eventName);
				}
			}
		}
	}

	/**
	 * Инициировать событие с данными
	 */
	emit<T>(event: Event<T>) {
		this.events.forEach((subscribers, name) => {
			if (
				(event.name instanceof RegExp && event.name.test(name)) ||
				name === event.name
			) {
				subscribers.forEach((callback) => callback(event.data));
			}
		});
	}

	/**
	 * Сделать коллбек триггер, генерирующий событие при вызове
	 */
	makeEmiter<T>(eventName: string, contextData?: Partial<T>) {
		return (data?: T) => {
			this.emit({
				name: eventName,
				data: { ...data, ...contextData },
			});
		};
	}
}
