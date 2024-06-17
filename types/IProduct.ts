
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

export interface ITransactionProduct {
    product_id: number;
    unit_price: number;
    total_price: number;
    quantity: number;
    product_name: string;
    description: string;
    category_name: string;
}

export interface ICategorizedProduct {
    quantity: number;
    total: number;
    products: ITransactionProduct[];
}

export interface IProductCategories {
    [categoryName: string]: ICategorizedProduct;
}