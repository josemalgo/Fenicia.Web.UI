import { Category } from '../category.model';

export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    stock: number;
    category: Category;
}