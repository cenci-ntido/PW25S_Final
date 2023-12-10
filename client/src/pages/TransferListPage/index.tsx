import {useEffect, useState} from "react";
import TransferService from "@/service/TransferService.ts";
import {ITransfer} from "@/commons/interfaces";
import {Link} from "react-router-dom";
import {Button} from "@chakra-ui/react";

export function TransferListPage() {
    const [data, setData] = useState([]);
    const [apiError, setApiError] = useState("");

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        TransferService.findAll()
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const onClickRemove = (id?: number) => {
        if (id) {
            TransferService.remove(id)
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
                    <h1 className="h3 mb-3 fw-normal">Lista de Transferências</h1>
                </div>
                <div className="text-center">

                    <Button colorScheme={'teal'}>
                        <Link  to="/transfers/new">
                            Nova Transferência
                        </Link>
                    </Button>

                </div>
                {apiError && <div className="alert alert-danger">{apiError}</div>}
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <td>#</td>
                        <td>Descrição</td>
                        <td>Valor</td>
                        <td>Data</td>
                        <td>Conta de Origem</td>
                        <td>Conta de Destino</td>
                        <td>Editar</td>
                        <td>Remover</td>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((transfer: ITransfer) => (
                        <tr key={transfer.id}>
                            <td>{transfer.id}</td>
                            <td>{transfer.description}</td>
                            <td>{transfer.realValue}</td>
                            <td>{transfer.date}</td>
                            <td>{transfer.accountOrigin.description}</td>
                            <td>{transfer.accountDestiny.description}</td>
                            <td>
                                <Link
                                    className="btn btn-primary"
                                    to={`/transfers/${transfer.id}`}
                                >
                                    Editar
                                </Link>
                            </td>
                            <td>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => onClickRemove(transfer.id)}
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
