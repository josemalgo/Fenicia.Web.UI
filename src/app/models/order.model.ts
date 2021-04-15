import { OrderItem } from "./OrderItem.model";
import { Address } from "./address.model";

export interface Order {
    id: string,
    customerId: string,
    employeeId: string,
    deliveryAddress: Address,
    priority: number,
    status: number,
    iva: number,
    orderItems: OrderItem[]
}