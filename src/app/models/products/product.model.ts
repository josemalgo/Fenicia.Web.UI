import { Category } from '../category.model';

export interface Product {
    id: string;
    name: string;
    price: number;
    iva: number;
    description: string;
    stock: number;
    category: Category;
}