import { ICreateOrder } from "../models/ICreateOrder";
import { IOrder } from "../models/IOrder";

export interface IOrdersRepository {
    findById(id: string): Promise<IOrder | null>;
    findAll(): Promise<IOrder[] | null>;
    create(data: ICreateOrder): Promise<IOrder>;
}
