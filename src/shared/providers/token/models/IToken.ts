export interface IGenerateToken {
    token: string;
    expiresIn: number;
}

export interface IVerifyToken<T> {
    token: string;
    payload: T;
}

export interface IToken {
    generate(payload: string): Promise<IGenerateToken>;
    verify<T>(token: string): Promise<IVerifyToken<T>>;
}
