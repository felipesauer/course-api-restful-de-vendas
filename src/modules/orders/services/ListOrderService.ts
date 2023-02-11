import { inject, injectable } from "tsyringe";
import { IOrder } from "../domain/models/IOrder";
import { IOrdersRepository } from "../domain/repositories/IOrdersRepository";

@injectable()
class ListOrderService {
    constructor(
        @inject("OrdersRepository")
        private ordersRepository: IOrdersRepository,
    ) {}

    public async execute(): Promise<IOrder[] | null> {
        return await this.ordersRepository.findAll();
    }
}

export default ListOrderService;
