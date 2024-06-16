
export interface IProduct {
    id: number;
    product_name: string;
    description: string;
    extra_info?: string;
    price: number;
    category_id: number;
    quantity?: number;
}

export interface IProductWithCategory extends IProduct{
    category_name: string;
}