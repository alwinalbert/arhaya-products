export const FREE_DELIVERY_THRESHOLD = 220
export const STANDARD_DELIVERY_FEE = 49

export function getDeliveryCharge(subtotal: number) {
  return subtotal > FREE_DELIVERY_THRESHOLD ? 0 : STANDARD_DELIVERY_FEE
}
