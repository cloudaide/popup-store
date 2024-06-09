import IProduct from "./IProduct";

interface ICategory {
    id: Number;
    name: String;
    products: IProduct[];
}

export default ICategory;