export abstract class View<T> {
	protected constructor(protected readonly container: HTMLElement) {}

	protected toggleClass(
		element: HTMLElement,
		className: string,
		force?: boolean
	) {
		if (element) {
			element.classList.toggle(className, force);
		}
	}

	/**
	 * Установить текстовое содержимое
	 */
	protected setText(element: HTMLElement, value: unknown) {
		if (element) {
			element.textContent = String(value);
		}
	}

	/**
	 * Сменить статус блокировки
	 */
	protected setDisabled(element: HTMLElement, state: boolean) {
		if (element) {
			if (state) element.setAttribute('disabled', 'disabled');
			else element.removeAttribute('disabled');
		}
	}

	/**
	 * Скрыть элемент
	 */
	protected setHidden(element: HTMLElement) {
		element.style.display = 'none';
	}

	/**
	 * Скрыть элемент
	 */
	protected setValue(element: HTMLInputElement, value: string) {
		element.value = value;
	}

	/**
	 * Показать элемент
	 */
	protected setVisible(element: HTMLElement) {
		element.style.removeProperty('display');
	}

	/**
	 * Установить изображение с алтернативным текстом
	 */
	protected setImage(element: HTMLImageElement, src: string, alt?: string) {
		if (element) {
			element.src = src;
			if (alt) {
				element.alt = alt;
			}
		}
	}
	/**
	 * Вернуть корневой DOM-элемент
	 */
	render(data?: Partial<T>): HTMLElement {
		Object.assign(this, data ?? {});
		return this.container;
	}
}
