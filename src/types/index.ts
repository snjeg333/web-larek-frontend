export type ProductId = string;
export type ProductCaregory =
	| 'другое'
	| 'софт-скил'
	| 'хард-скил'
	| 'дополнительное'
	| 'кнопка';
export type Price = number | null;
export type PaymentType = "card" | "cash"
