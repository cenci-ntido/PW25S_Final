export interface IUserLogin {
    username: string;
    password: string;
}

export interface IUserSignup {
    displayName: string;
    username: string;
    password: string;
}

export interface IAccount {
    id?: number;
    description: string;
    savedMoney: number;
}

export interface IProduct {
    id?: number;
    name: string;
    description: string;
    price: number;
    category: ICategory;
}