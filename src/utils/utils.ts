import { Event } from '../components/base/EventEmitter';

export function isSelector(x: unknown): x is string {
	return typeof x === 'string' && x.length > 1;
}

export type SelectorCollection<T> = string | NodeListOf<Element> | T[];

export function ensureAllElements<T extends HTMLElement>(
	selectorElement: SelectorCollection<T>,
	context: HTMLElement = document as unknown as HTMLElement
): T[] {
	if (isSelector(selectorElement)) {
		return Array.from(context.querySelectorAll(selectorElement)) as T[];
	}
	if (selectorElement instanceof NodeList) {
		return Array.from(selectorElement) as T[];
	}
	if (Array.isArray(selectorElement)) {
		return selectorElement;
	}
	throw new Error(`Unknown selector element`);
}

export type SelectorElement<T> = T | string;

export function ensureElement<T extends HTMLElement>(
	selectorElement: SelectorElement<T>,
	context?: HTMLElement
): T {
	if (isSelector(selectorElement)) {
		const elements = ensureAllElements<T>(selectorElement, context);
		if (elements.length > 1) {
			console.warn(`selector ${selectorElement} return more then one element`);
		}
		if (elements.length === 0) {
			throw new Error(`selector ${selectorElement} return nothing`);
		}
		return elements.pop() as T;
	}
	if (selectorElement instanceof HTMLElement) {
		return selectorElement as T;
	}
	throw new Error('Unknown selector element');
}

export function cloneTemplate<T = HTMLElement>(
	query: string | HTMLTemplateElement
) {
	const template = ensureElement(query) as HTMLTemplateElement;
	const firstElementChild = template.content.firstElementChild;
	return firstElementChild && (firstElementChild.cloneNode(true) as T);
}

export function bem(
	block: string,
	element?: string,
	modifier?: string
): { name: string; class: string } {
	let name = block;
	if (element) name += `__${element}`;
	if (modifier) name += `_${modifier}`;
	return {
		name,
		class: `.${name}`,
	};
}

export function createEvent<T>(eventName: string, data?: T): Event<T> {
	return { name: eventName, data: data };
}

