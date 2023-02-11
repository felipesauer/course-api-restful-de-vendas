import { Repository } from "typeorm";
import { IOrdersRepository } from "@modules/orders/domain/repositories/IOrdersRepository";
import { ICreateOrder } from "@modules/orders/domain/models/ICreateOrder";
import { DataSource } from "@shared/infra/database/typeorm/DataSource";
import { IOrder } from "@modules/orders/domain/models/IOrder";
import Order from "../entities/Order";

class OrdersRepository implements IOrdersRepository {
    private ormRepository: Repository<Order>;

    constructor() {
        this.ormRepository = DataSource.getRepository(Order);
    }

    async findById(id: string): Promise<Order | null> {
        return await this.ormRepository.findOne({
            where: {
                id,
            },
            relations: ["order_products", "customer"],
        });
    }

    async findAll(): Promise<IOrder[] | null> {
        return await this.ormRepository.find();
    }

    async create({ customer, products }: ICreateOrder): Promise<Order> {
        const order = this.ormRepository.create({
            customer,
            order_products: products,
        });

        await this.ormRepository.save(order);

        return order;
    }
}

export default OrdersRepository;
