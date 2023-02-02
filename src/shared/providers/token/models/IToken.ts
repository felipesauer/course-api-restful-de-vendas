export interface IResponseToken {
    token: string;
    expiresIn: number;
}

export interface IToken {
    generate(payload: string): Promise<IResponseToken>;
    verify(token: string): Promise<boolean>;
}
