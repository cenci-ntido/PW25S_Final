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

export interface ITransaction {
    id?: number;
    description: string;
    realValue: number;
    date: string;
    account: IAccount;
    category: string;
    status: string;
    type: string;
}