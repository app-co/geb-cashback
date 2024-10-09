export interface IResposePaymentCard {
  id: string;
  reference_id: string;
  created_at: string;
  customer: Customer;
  items: Items[];
  shipping: Shipping;
  payment_method: Payment_method;
  notification_urls: string[];
  links: Links2[];
}

export interface Customer {
  name: string;
  email: string;
  tax_id: string;
  phones: Phones[];
}

export interface Phones {
  type: string;
  country: string;
  area: string;
  number: string;
}

export interface Items {
  reference_id: string;
  name: string;
  quantity: number;
  unit_amount: number;
}

export interface Shipping {
  address: Address;
}

export interface Address {
  street: string;
  number: string;
  complement: string;
  locality: string;
  city: string;
  region_code: string;
  country: string;
  postal_code: string;
}

export interface Charges {
  id: string;
  reference_id: string;
  status: string;
  created_at: string;
  paid_at: string;
  description: string;
  amount: Amount;
  payment_response: Payment_response;
  payment_method: Payment_method;
  links: Links[];
}

export interface Amount {
  value: number;
  currency: string;
  summary: Summary;
}

export interface Summary {
  total: number;
  paid: number;
  refunded: number;
}

export interface Payment_response {
  code: string;
  message: string;
  reference: string;
}

export interface Payment_method {
  type: string;
  installments: number;
  capture: boolean;
  card: Card;
  soft_descriptor: string;
}

export interface Card {
  id: string;
  brand: string;
  first_digits: string;
  last_digits: string;
  exp_month: string;
  exp_year: string;
  holder: Holder;
  store: boolean;
}

export interface Holder {
  name: string;
  tax_id: string;
}

export interface Links {
  rel: string;
  href: string;
  media: string;
  type: string;
}

export interface Links2 {
  rel: string;
  href: string;
  media: string;
  type: string;
}
