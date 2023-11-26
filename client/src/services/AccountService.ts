import { IAccount} from "@/commons/interfaces.ts";
import { api } from "@/lib/axios";


const findAll = () => {
    return api.get('/accounts');
}

const save = (account: IAccount) => {
    return api.post('/accounts', account);
}

const update = (account: IAccount) => {
    return api.post(`/accounts/${account.id}`, account);
}

const findById = (id: number) => {
    return api.get(`/accounts/${id}`);
}

const remove = (id: number) => { 
    return api.delete(`/accounts/${id}`);
}

const AccountService = {
    findAll,
    save,
    findById,
    remove,
    update
}

export default AccountService;