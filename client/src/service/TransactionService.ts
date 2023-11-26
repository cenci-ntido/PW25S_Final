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

const remove = (id: number) => {
  return api.delete(`/transactions/${id}`);
};

const TransactionService = {
  save,
  findAll,
  findOne,
  remove,
};

export default TransactionService;
