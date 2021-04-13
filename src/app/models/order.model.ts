import { OrderItem } from "./OrderItem.model";

export interface Order {
    id: string,
    customerId: number,
    employeeId: number,
    deliveryAddressId: number,
    priority: number,
    status: number,
    iva: number,
    orderItems: OrderItem[]
}