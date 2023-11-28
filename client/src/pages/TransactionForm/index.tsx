import {ChangeEvent, useState, useEffect} from "react";
import {ButtonWithProgress} from "@/components/ButtonWithProgress";
import {Input} from "@/components/Input";
// import {IAccount} from "@/commons/interfaces";
import {ITransaction} from "@/commons/interfaces";
// import AccountService from "@/service/AccountService.ts";
import {useNavigate, useParams} from "react-router-dom";
import TransactionService from "@/service/TransactionService.ts";

export function TransactionForm() {
    const [form, setForm] = useState<ITransaction>({
        id: undefined,
        description: "",
        realValue: 0,
        type: "",
        status: "",
        date: "",
        category: "",
        account: {id: undefined, description: "", savedMoney: 0}
    });
    const [errors, setErrors] = useState({
        id: undefined,
        description: "",
        realValue: 0,
        type: "",
        status: "",
        date: "",
        category: "",
        account: {id: undefined, description: "", savedMoney: 0}
    });
    const [pendingApiCall, setPendingApiCall] = useState(false);
    const [apiError, setApiError] = useState(false);
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        if (id) {
            TransactionService.findById(parseInt(id))
                .then((response) => {
                    if (response.data) {
                        setForm({
                            id: response.data.id,
                            description: response.data.description,
                            realValue: response.data.realValue,
                            type: response.data.type,
                            status: response.data.status,
                            date: response.data.date,
                            category: response.data.category,
                            account: {id: response.data.account.id,
                                description: response.data.account.description, savedMoney: response.data.account.savedMoney}
                        });
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }, []);

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {value, name} = event.target;
        setForm((previousForm) => {
            return {
                ...previousForm,
                [name]: value,
            };
        });
        setErrors((previousErrors) => {
            return {
                ...previousErrors,
                [name]: "",
            };
        });
    };

    const onSubmit = () => {

        const transaction: ITransaction = {
            id: form.id,
            description: form.description,
            realValue: form.realValue,
            type: form.type,
            status: form.status,
            date: form.date,
            category: form.category,
            account: {id: form.account.id, description: form.account.description, savedMoney: form.account.savedMoney}
        };
        setPendingApiCall(true);
        TransactionService.save(transaction)
            .then((response) => {
                console.log(response);
                setPendingApiCall(false);
                navigate("/transactions");
            })
            .catch((responseError) => {
                if (responseError.response.data.validationErrors) {
                    setErrors(responseError.response.data.validationErrors);
                }
                setPendingApiCall(false);
                setApiError(true);
            });
    };

    return (
        <>
            <main className="container">
                <form>
                    <div className="text-center">
                        <h1 className="h3 mb-3 fw-normal">Cadastro de Transação</h1>
                    </div>

                    <div className="form-floating mb-3">
                        <Input
                            className="form-control"
                            name="description"
                            label="Descrição"
                            placeholder="Informe a descrição"
                            type="text"
                            value={form.description}
                            onChange={onChange}
                            hasError={errors.description ? true : false}
                            error={errors.description}
                        />
                    </div>
                    <div className="form-floating mb-3">
                        <Input
                            className="form-control"
                            name="realValue"
                            label="Valor"
                            placeholder="Informe o valor da transação"
                            type="number"
                            value={form.realValue.toString()}
                            onChange={onChange}
                            hasError={errors.description ? true : false}
                            error={errors.description}
                        />
                    </div>
                    {apiError && (
                        <div className="alert alert-danger">
                            Falha ao cadastrar conta.
                        </div>
                    )}

                    <ButtonWithProgress
                        onClick={onSubmit}
                        disabled={pendingApiCall ? true : false}
                        pendingApiCall={pendingApiCall}
                        text="Salvar"
                    />
                </form>
            </main>
        </>
    );
}
