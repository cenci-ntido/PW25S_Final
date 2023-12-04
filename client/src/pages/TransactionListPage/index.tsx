import {useEffect, useState} from "react";
import TransactionService from "@/service/TransactionService.ts";
import {ITransaction} from "@/commons/interfaces";
import {Link} from "react-router-dom";
import {Button} from "@chakra-ui/react";

export function TransactionListPage() {
    const [data, setData] = useState([]);
    const [apiError, setApiError] = useState("");

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        TransactionService.findAll()
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const onClickRemove = (id?: number) => {
        if (id) {
            TransactionService.remove(id)
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
                    <h1 className="h3 mb-3 fw-normal">Lista de Transações</h1>
                </div>
                <div className="text-center">

                    <Button colorScheme={'teal'}>
                        <Link  to="/transactions/new">
                            Nova Transação
                        </Link>
                    </Button>

                    <Button colorScheme={'teal'}>
                        <Link  to="/transactions-v1/new">
                            Nova Transação v1
                        </Link>
                    </Button>
                </div>
                {apiError && <div className="alert alert-danger">{apiError}</div>}
                <table className="table table-striped">
                    <thead>//
                    <tr>
                        <td>#</td>
                        <td>Descrição</td>
                        <td>Valor</td>
                        <td>Data</td>
                        <td>Conta</td>
                        <td>Status</td>
                        <td>Tipo</td>
                        <td>Categoria</td>
                        <td>Editar</td>
                        <td>Remover</td>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((transaction: ITransaction) => (
                        <tr key={transaction.id}>
                            <td>{transaction.id}</td>
                            <td>{transaction.description}</td>
                            <td>{transaction.realValue}</td>
                            <td>{transaction.date}</td>
                            <td>{transaction.account.description}</td>
                            <td>{transaction.status}</td>
                            <td>{transaction.typeTransaction}</td>
                            <td>{transaction.category}</td>
                            <td>
                                <Link
                                    className="btn btn-primary"
                                    to={`/transactions/${transaction.id}`}
                                >
                                    Editar
                                </Link>
                            </td>
                            <td>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => onClickRemove(transaction.id)}
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
