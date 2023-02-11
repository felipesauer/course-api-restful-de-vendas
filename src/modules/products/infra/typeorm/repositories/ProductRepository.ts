import { ICreateProduct } from "@modules/products/domain/models/ICreateProduct";
import { IFindProducts } from "@modules/products/domain/models/IFindProducts";
import { IProduct } from "@modules/products/domain/models/IProduct";
import { IUpdateStockProduct } from "@modules/products/domain/models/IUpdateStockProduct";
import { IProductsRepository } from "@modules/products/domain/repositories/IProductsRepository";
import { DataSource } from "@shared/infra/database/typeorm/DataSource";
import { Repository, In } from "typeorm";
import Product from "../entities/Product";

class ProductRepository implements IProductsRepository {
    private ormRepository: Repository<Product>;

    constructor() {
        this.ormRepository = DataSource.getRepository(Product);
    }

    public async create({
        name,
        price,
        quantity,
    }: ICreateProduct): Promise<Product> {
        const product = this.ormRepository.create({ name, price, quantity });

        await this.ormRepository.save(product);

        return product;
    }

    public async save(product: Product): Promise<Product> {
        await this.ormRepository.save(product);

        return product;
    }

    public async remove(product: Product): Promise<void> {
        await this.ormRepository.remove(product);
    }

    public async updateStock(products: IUpdateStockProduct[]): Promise<void> {
        await this.ormRepository.save(products);
    }

    public async findByName(name: string): Promise<Product | null> {
        const product = this.ormRepository.findOneBy({
            name,
        });

        return product;
    }

    public async findById(id: string): Promise<Product | null> {
        const product = this.ormRepository.findOneBy({ id });

        return product;
    }

    public async findAll(): Promise<IProduct[]> {
        return this.ormRepository.find();
    }

    public async findAllByIds(products: IFindProducts[]): Promise<Product[]> {
        const productIds = products.map(product => product.id);

        const existentProducts = await this.ormRepository.find({
            where: {
                id: In(productIds),
            },
        });

        return existentProducts;
    }
}

export default ProductRepository;
