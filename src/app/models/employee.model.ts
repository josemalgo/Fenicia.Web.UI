import { Address } from "./address.model";
import { User } from "./user.model";

export interface Employee {
    id: string;
    dni: string;
    name: string;
    surname: string;
    phone: number;
    isAdmin: boolean,
    address: Address;
    user: User;
    job: string,
    salary: number,
    //orderFinish: List
    //orderInProcess: List
}