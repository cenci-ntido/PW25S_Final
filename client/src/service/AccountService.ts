import { IAccount } from '@/commons/interfaces';
import { api } from '@/lib/axios'

const save = (account: IAccount) => {
    return api.post('/accounts', account);
}

const findAll = () => {
    return api.get('/accounts');
}

const remove = (id: number) => {
    return api.delete(`/accounts/${id}`);
}

const findById = (id: number) => {
    return api.get(`/accounts/${id}`);
}

const AccountService = {
    save,
    findAll,
    remove,
    findById,
}

export default AccountService;