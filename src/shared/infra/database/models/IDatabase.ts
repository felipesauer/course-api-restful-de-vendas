export interface IDatabase<T> {
    initialization(): Promise<void>;
    dataSource: T;
}
