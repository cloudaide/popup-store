
interface IProduct {
    id: number;
    product_name: string;
    description: string;
    extra_info?: string;
    price: number;
    category_id: number;
    quantity?: number;
}

export default IProduct;