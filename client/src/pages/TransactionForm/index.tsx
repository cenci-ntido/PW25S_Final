import {ChangeEvent, useState, useEffect} from "react";
import {ButtonWithProgress} from "@/components/ButtonWithProgress";
import {Input} from "@/components/Input";
import {IAccount, ITransaction} from "@/commons/interfaces";
import {useNavigate, useParams} from "react-router-dom";
import TransactionService from "@/service/TransactionService.ts";
import {Select} from "@/components/Select";
import {useForm} from "react-hook-form";
import AccountService from "@/service/AccountService.ts";
import {FormControl, FormLabel, Select as SelectChakra} from "@chakra-ui/react";

export function TransactionForm() {
    const [options, setOptions] = useState<{ element: string }[]>([]);
    const [optionsType, setOptionsType] = useState<{ element: string }[]>([]);
    const [optionsCategories, setoptionsCategories] = useState<{ element: string }[]>([]);
    const [types, setType] = useState<string[]>([]);
    const [statuslist, setStatus] = useState<string[]>([]);
    const [categoriesList, setCategoriesList] = useState<string[]>([]);
    const [accounts, setAccounts] = useState<IAccount[]>([]);
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
    const {
        register,
    } = useForm<ITransaction>();
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
        loadData()
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
                            account: {
                                id: response.data.account.id,
                                description: response.data.account.description,
                                savedMoney: response.data.account.savedMoney
                            }
                        });
                    }
                })
                .catch((error) => {
                    console.log(error);
                })
        }
        // else {
        //     setForm((previousForm) => {
        //         return {
        //             ...previousEntity,
        //             category: {id: categories[0]?.id, name: ""},
        //         };
        //     });
        // }
        setOptions(statuslist.map((element) => ({ element })));
        setOptionsType(types.map((element) => ({ element })));
        setoptionsCategories(categoriesList.map((element) => ({ element })));
    }, [statuslist, types, categoriesList]);

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
    const loadData = async () => {
        // Busca a lista de categorias
        await AccountService.findAll()
            .then((response) => {
                // caso sucesso, adiciona a lista no state
                setAccounts(response.data);
                setApiError(false);
            })
            .catch(() => {
                setApiError(true);
            });

        await TransactionService.getenumtype()
            .then((response) => {
                // caso sucesso, adiciona a lista no state
                console.log("Response.data")
                console.log(response.data)
                setType(response.data);
                console.log("Types")
                console.log(types);
                setApiError(false);
            })
            .catch(() => {
                setApiError(true);
            });

        await TransactionService.getenumstatus()
            .then((response) => {
                // caso sucesso, adiciona a lista no state
                setStatus(response.data);
                setApiError(false);
            })
            .catch(() => {
                setApiError(true);
            });

        await TransactionService.getenumcategories()
            .then((response) => {
                // caso sucesso, adiciona a lista no state
                setCategoriesList(response.data);
                setApiError(false);
            })
            .catch(() => {
                setApiError(true);
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
            category: form.category.toString(),
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
                    <div className="form-floating mb-3">
                        <Input
                            className="form-control"
                            name="date"
                            label="Data"
                            placeholder="Informe a data da transação"
                            type="date"
                            value={form.date.toString()}
                            onChange={onChange}
                            hasError={errors.description ? true : false}
                            error={errors.description}
                        />
                    </div>
                    <div className="form-floating mb-3">
                        <FormControl>
                            <FormLabel htmlFor='account'>Conta</FormLabel>
                        </FormControl>
                        <SelectChakra
                            id="account"
                            {...register("account.id", {
                                required: "O campo conta é obrigatório",
                            })}
                        >
                            {accounts.map((account: IAccount) => (
                                <option key={account.id} value={account.id}>
                                    {account.description}
                                </option>
                            ))}
                        </SelectChakra>
                    </div>
                    <div className="form-floating mb-3">
                        <Select id={'status'} list = {options} label={"Status"}></Select>
                    </div>
                    <div className="form-floating mb-3">
                        <Select id={'type'} list = {optionsType} label={"Tipo"}></Select>
                    </div>
                    <div className="form-floating mb-3">
                        <Select id={'categories'} list = {optionsCategories} label={"Categoria"}></Select>
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
