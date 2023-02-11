import { IProduct } from "../models/IProduct";
import { IFindProducts } from "../models/IFindProducts";
import { ICreateProduct } from "../models/ICreateProduct";
import { IUpdateStockProduct } from "../models/IUpdateStockProduct";

export interface IProductsRepository {
    findByName(name: string): Promise<IProduct | null>;
    findById(id: string): Promise<IProduct | null>;
    findAll(): Promise<IProduct[] | null>;
    findAllByIds(products: IFindProducts[]): Promise<IProduct[]>;
    create(data: ICreateProduct): Promise<IProduct>;
    save(product: IProduct): Promise<IProduct>;
    updateStock(products: IUpdateStockProduct[]): Promise<void>;
    remove(product: IProduct): Promise<void>;
}
