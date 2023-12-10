import { ITransfer } from "@/commons/interfaces";
import { api } from "@/lib/axios";

const save = (transfer: ITransfer) => {
  return api.post("/transfers", transfer);
};

const findAll = () => {
  return api.get("/transfers");
};

const findOne = (id: number) => {
  return api.get(`/transfers/${id}`);
};

const findById = (id: number) => {
  return api.get(`/transfers/${id}`);
};

const remove = (id: number) => {
  return api.delete(`/transfers/${id}`);
};



const TransferService = {
  save,
  findAll,
  findOne,
  findById,
  remove
};

export default TransferService;
