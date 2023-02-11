import { inject, injectable } from "tsyringe";
import { IProduct } from "../domain/models/IProduct";
import { IProductsRepository } from "../domain/repositories/IProductsRepository";

@injectable()
class ListProductService {
    constructor(
        @inject("ProductsRepository")
        private productsRepository: IProductsRepository,
    ) {}

    public async execute(): Promise<IProduct[] | null> {
        return this.productsRepository.findAll();
    }
}

export default ListProductService;
