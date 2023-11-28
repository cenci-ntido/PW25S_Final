import { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import { ITransaction } from "@/commons/interfaces";
import TransactionService from "@/service/TransactionService.ts";
import {ListPage} from "@/components/ListPage";

export function TransactionListPage() {
  const [data, setData] = useState<ITransaction[]>([]);
  const [apiError, setApiError] = useState("");
  const [showDeleteMessage, setShowDeleteMessage] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    TransactionService.findAll()
      .then((response) => {
        setData(response.data);
        setApiError("");
      })
      .catch(() => {
        setApiError("Falha ao carregar a lista de transações");
      });
  };



  const onRemove = (id: number) => {
    TransactionService.remove(id)
      .then(() => {
        setShowDeleteMessage(true);
        loadData();
        setTimeout(() => {
          setShowDeleteMessage(false);
        }, 1500);
        setApiError("");
      })
      .catch(() => {
        setApiError("Falha ao remover a transação");
      });
  };

    return (
        <ListPage
            data={data}
            loadData={loadData}
            onEdit={(path) => navigate(path)}
            onRemove={onRemove}
            addButtonLink="/transactions/new"
            pageTitle="Lista de Transações"
            pageURL={"/transactions"}
        />
    );
}