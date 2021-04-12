export interface OrderItem {
    id: string,
    quantity: number,
    discount: number | undefined,
    productId: string,
    orderId: string
}