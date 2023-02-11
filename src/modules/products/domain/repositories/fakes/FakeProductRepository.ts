import { v4 as uuid } from "uuid";
import { ICreateProduct } from "@modules/products/domain/models/ICreateProduct";
import { IFindProducts } from "@modules/products/domain/models/IFindProducts";
import { IProduct } from "@modules/products/domain/models/IProduct";
import { IUpdateStockProduct } from "@modules/products/domain/models/IUpdateStockProduct";
import { IProductsRepository } from "@modules/products/domain/repositories/IProductsRepository";
import Product from "@modules/products/infra/typeorm/entities/Product";

class FakeProductRepository implements IProductsRepository {
    private products: Product[] = [];

    public async create({
        name,
        price,
        quantity,
    }: ICreateProduct): Promise<Product> {
        const product = new Product();

        product.id = uuid();
        product.name = name;
        product.price = price;
        product.quantity = quantity;

        this.products.push(product);

        return product;
    }

    public async save(product: Product): Promise<Product> {
        this.products.push(product);

        return product;
    }

    public async remove(product: Product): Promise<void> {
        this.products = this.products.filter(p => p.id != product.id);
    }

    public async updateStock(products: IUpdateStockProduct[]): Promise<void> {
        this.products.forEach((p, i) => {
            const prod = products.find(pf => pf.id == p.id);
            if (prod)
                this.products[i] = {
                    ...this.products[i],
                    ...prod,
                };
        });
    }

    public async findByName(name: string): Promise<Product | null> {
        return this.products.find(p => p.name == name) || null;
    }

    public async findById(id: string): Promise<Product | null> {
        return this.products.find(p => p.id == id) || null;
    }

    public async findAll(): Promise<IProduct[]> {
        return this.products;
    }

    public async findAllByIds(products: IFindProducts[]): Promise<Product[]> {
        const productIds = products.map(product => product.id);
        return this.products.filter(p => productIds.includes(p.id));
    }
}

export default FakeProductRepository;
