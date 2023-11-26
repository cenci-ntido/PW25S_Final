import {ChangeEvent, useState, useEffect} from "react";
import {ButtonWithProgress} from "@/components/ButtonWithProgress";
import {Input} from "@/components/Input";
import {IAccount} from "@/commons/interfaces";
import AccountService from "@/services/AccountService.ts";
import {useNavigate, useParams} from "react-router-dom";

export function AccountFormPage() {
    const [form, setForm] = useState<IAccount>({
        id: undefined,
        description: "",
        savedMoney: 0
    });
    const [errors, setErrors] = useState({
        id: undefined,
        description: "",
        savedMoney: 0
    });
    const [pendingApiCall, setPendingApiCall] = useState(false);
    const [apiError, setApiError] = useState(false);
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        if (id) {
            AccountService.findById(parseInt(id))
                .then((response) => {
                    if (response.data) {
                        setForm({
                            id: response.data.id,
                            description: response.data.description,
                            savedMoney: response.data.savedMoney
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

        const account: IAccount = {
            id: form.id,
            description: form.description,
            savedMoney: form.savedMoney
        };
        setPendingApiCall(true);
        AccountService.save(account)
            .then((response) => {
                console.log(response);
                setPendingApiCall(false);
                navigate("/accounts");
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
                        <h1 className="h3 mb-3 fw-normal">Cadastro de Conta</h1>
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
                            name="savedMoney"
                            label="Dinheiro guardado"
                            placeholder="Informe quanto de dinheiro guardado"
                            type="number"
                            value={form.savedMoney.toString()}
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
                        // className="w-100 btn btn-lg btn-primary mb-3"
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
