import { Address } from "../address.model";

export interface Customer {
     id: string;
     email: string;
     tradeName: string;
     fiscalName: string;
     nif: string;
     phone: number;
     address: Address;
}