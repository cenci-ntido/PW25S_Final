import { ITransaction } from "@/commons/interfaces";
import { api } from "@/lib/axios";

const save = (transaction: ITransaction) => {
  return api.post("/transactions", transaction);
};

const findAll = () => {
  return api.get("/transactions");
};

const findOne = (id: number) => {
  return api.get(`/transactions/${id}`);
};

const findById = (id: number) => {
  return api.get(`/transactions/${id}`);
};

const remove = (id: number) => {
  return api.delete(`/transactions/${id}`);
};

const getenumtype = () => {
  return api.get("/transactions/enumtype");
}

const getenumstatus = () => {
  return api.get("/transactions/enumstatus");
}

const TransactionService = {
  save,
  findAll,
  findOne,
  findById,
  remove,
  getenumtype,
  getenumstatus
};

export default TransactionService;
