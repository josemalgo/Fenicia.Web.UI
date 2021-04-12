import { OrderItem } from "./OrderItem.model";

export interface Order {
    id: string,
    customerId: number,
    employeeId: number,
    addressId: number,
    priority: number,
    status: number,
    orderItems: OrderItem[]
}