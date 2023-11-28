import {useEffect, useState} from "react";
import AccountService from "@/service/AccountService.ts";
import { useNavigate} from "react-router-dom";
import {ListPage} from "@/components/ListPage";

export function AccountListPage() {
    const [data, setData] = useState([]);
    const [apiError, setApiError] = useState("");
    const navigate = useNavigate();

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
        <ListPage
            data={data}
            loadData={loadData}
            onEdit={(path) => navigate(path)}
            onRemove={onClickRemove}
            addButtonLink="/accounts/new"
            pageTitle="Lista de Contas"
            pageURL={"/accounts"}
        />
    );
}