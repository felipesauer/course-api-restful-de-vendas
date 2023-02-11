import { IOrdersRepository } from "@modules/orders/domain/repositories/IOrdersRepository";
import { ICreateOrder } from "@modules/orders/domain/models/ICreateOrder";
import Order from "@modules/orders/infra/typeorm/entities/Order";
import OrdersProducts from "@modules/orders/infra/typeorm/entities/OrdersProducts";

class FakeOrdersRepository implements IOrdersRepository {
    private orders: Order[] = [];

    async findById(id: string): Promise<Order | null> {
        const order = this.orders.find(order => order.id == id);
        return order || null;
    }

    async findAll(): Promise<Order[] | null> {
        return this.orders;
    }

    async create({ customer, products }: ICreateOrder): Promise<Order> {
        const ordersProducts = products.map(p => {
            const orderProduct = new OrdersProducts();
            return {
                ...orderProduct,
                ...p,
            };
        });

        const order: Order = {
            ...({} as Order),
            customer,
            order_products: ordersProducts,
        };

        this.orders.push(order);

        return order;
    }
}

export default FakeOrdersRepository;
