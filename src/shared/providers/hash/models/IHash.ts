export interface IHash {
    compare(payload: string, hash: string): Promise<boolean>;
    generate(payload: string): Promise<string>;
}
