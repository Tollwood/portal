import {Credential} from "./Credential";

export interface User {
    id?: string,
    username?: string,
    enabled?: boolean
    firstName?: string,
    lastName?: string,
    email?: string,
    credentials?: Credential[]
}