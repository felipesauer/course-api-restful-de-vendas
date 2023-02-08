export interface IDatabase<T> {
    initialize(): Promise<void>;
    dataSource: T;
}
