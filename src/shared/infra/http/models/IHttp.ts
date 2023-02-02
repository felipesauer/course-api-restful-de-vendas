export interface IHttp<T> {
    initialization(): Promise<void>;
    routes: T;
}
