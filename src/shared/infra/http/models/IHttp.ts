export interface IHttp<T> {
    initialize(): Promise<void>;
    routes: T;
}
