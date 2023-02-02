import { compare, hash } from "bcryptjs";
import { IHash } from "../models/IHash";

export class Bcryptjs implements IHash {
    public async compare(payload: string, hashed: string): Promise<boolean> {
        return compare(payload, hashed);
    }

    public async generate(payload: string): Promise<string> {
        return hash(payload, 8);
    }
}
