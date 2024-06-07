import { ProductCaregory } from '../types';
import { bem } from './utils';

export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

export const categoryMapping: Record<ProductCaregory, string> = {
	'другое': bem('card', 'category', 'other').name,
	'софт-скил': bem('card', 'category', 'soft').name,
	'дополнительное': bem('card', 'category', 'additional').name,
	'кнопка': bem('card', 'category', 'button').name,
	'хард-скил': bem('card', 'category', 'hard').name,
};
