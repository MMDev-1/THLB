/**
 * Order & address types.
 */

export interface Address {
  firstName: string;
  lastName: string;
  line1: string;
  line2: string;
  city: string;
  /** State / governorate / province */
  state: string;
  zip: string;
  country: string;
  phone: string;
}

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

export interface OrderLineItem {
  productId: string;
  variantId: string;
  title: string;
  colour: string;
  size: string;
  quantity: number;
  /** Unit price in cents */
  price: number;
  image: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  lineItems: OrderLineItem[];
  /** Subtotal in cents */
  subtotal: number;
  /** Shipping cost in cents */
  shipping: number;
  /** Total in cents */
  total: number;
  shippingAddress: Address;
  billingAddress: Address;
  createdAt: string;
  updatedAt: string;
}
