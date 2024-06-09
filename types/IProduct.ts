
interface IProduct {
    id: Number;
    product_name: string;
    description: string;
    extra_info?: string;
    price: number;
    category_id: number;
}

export default IProduct;