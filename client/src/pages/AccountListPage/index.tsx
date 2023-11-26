import { useEffect, useState } from "react";
import AccountService from "@/services/AccountService.ts";
import { IAccount } from "@/commons/interfaces";
import { Link } from "react-router-dom";

export function AccountListPage() {
  const [data, setData] = useState([]);
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    AccountService.findAll()
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onClickRemove = (id?: number) => {
    if (id) {
      AccountService.remove(id)
        .then(() => {
          loadData();
          setApiError("");
        })
        .catch((responseError) => {
          console.log(responseError);
          setApiError(responseError.response.data.message);
        });
    }
  };

  return (
    <>
      <main className="container">
        <div className="text-center">
          <h1 className="h3 mb-3 fw-normal">Lista de Contas</h1>
        </div>
        <div className="text-center">
          <Link className="btn btn-success" to="/categories/new">
            Nova Categoria
          </Link>
        </div>
        {apiError && <div className="alert alert-danger">{apiError}</div>}
        <table className="table table-striped">
          <thead>
            <tr>
              <td>#</td>
              <td>Nome</td>
              <td>Dinheiro Guardado</td>
              <td>Editar</td>
              <td>Remover</td>
            </tr>
          </thead>
          <tbody>
            {data.map((category: IAccount) => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.description}</td>
                <td>{category.savedMoney}</td>
                <td>
                  <Link
                    className="btn btn-primary"
                    to={`/categories/${category.id}`}
                  >
                    Editar
                  </Link>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => onClickRemove(category.id)}
                  >
                    Remover
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </>
  );
}