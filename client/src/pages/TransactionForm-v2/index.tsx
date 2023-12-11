import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {IAccount, ITransaction} from "@/commons/interfaces";
import AccountService from "@/service/AccountService.ts";
import TransactionService from "@/service/TransactionService.ts";
import {Button, FormControl, FormErrorMessage, FormLabel, Input, Select} from "@chakra-ui/react";
// import {Select} from "@/components/Select";
import {useForm} from "react-hook-form";

export function TransactionFormV2() {
    const {
        handleSubmit,
        register,
        formState: {errors, isSubmitting},
        reset,
    } = useForm<ITransaction>();
    const [apiError, setApiError] = useState("");
    const [accounts, setAccounts] = useState<IAccount[]>([]);
    const navigate = useNavigate();
    const {id} = useParams();
    const [entity, setEntity] = useState<ITransaction>({
        id: undefined,
        description: "",
        realValue: 0,
        typeTransaction: "",
        status: "",
        date: "",
        category: "",
        account: {id: undefined, description: "", savedMoney: 0},
    });

    //ENUNS
    const [types, setType] = useState<string[]>([]);
    const [statuslist, setStatus] = useState<string[]>([]);
    const [categoriesList, setCategoriesList] = useState<string[]>([]);


    // Executa ao carregar o componente
    useEffect(() => {
        loadData()
    }, []);

    // useEffect(() => {
    //     reset(entity);
    // }, [entity, reset]);

    const loadData = async () => {
        // Busca a lista de categorias
        await AccountService.findAll()
            .then((response) => {
                // caso sucesso, adiciona a lista no state
                setAccounts(response.data);
                setApiError("");
            })
            .catch(() => {
                setApiError("Falha ao carregar contas");
            });
        await TransactionService.getenumtype()
            .then((response) => {
                // caso sucesso, adiciona a lista no state
                setType(response.data);
                setApiError("");
            })
            .catch(() => {
                setApiError("Falha carregar tipos");
            });

        await TransactionService.getenumstatus()
            .then((response) => {
                // caso sucesso, adiciona a lista no state
                setStatus(response.data);
                setApiError("");
            })
            .catch(() => {
                setApiError("Falha carregar status");
            });

        await TransactionService.getenumcategories()
            .then((response) => {
                // caso sucesso, adiciona a lista no state
                setCategoriesList(response.data);
                setApiError("");
            })
            .catch(() => {
                setApiError("Falhas carregar categorias");
            });

        if (id) {
            // ao editar um produto, busca ele no back-end e carrega no objeto form que está no state.
            TransactionService.findById(parseInt(id))
                .then((response) => {
                    if (response.data) {
                        setEntity({
                            id: response.data.id,
                            description: response.data.description,
                            realValue: response.data.realValue,
                            typeTransaction: response.data.typeTransaction,
                            status: response.data.status,
                            date: response.data.date,
                            category: response.data.category,
                            account: {id: response.data.account.id, description: "", savedMoney: 0},
                        });
                        setApiError("");

                    } else {
                        setApiError("Falha ao carregar a transação");
                    }
                })
                .catch(() => {
                    setApiError("Falha ao carregar a transação");
                });

        } else {
            setEntity((previousEntity) => {
                return {
                    ...previousEntity,
                    account: {id: accounts[0]?.id, description: "", savedMoney: 0},
                };
            });
        }
    };


    const onSubmit = (data: ITransaction) => {
        console.log(JSON.stringify(data))
        const transaction: ITransaction = {
            ...data,
            id: entity.id,
            // description: entity.description,
            // realValue: entity.realValue,
            // typeTransaction: entity.typeTransaction,
            // status: entity.status,
            // date: entity.date,
            // category: entity.category,
            // account: {id: data.account.id, description: "", savedMoney: 0},
        };

        console.log(JSON.stringify(transaction))

        TransactionService.save(transaction)
            .then(() => {
                navigate("/transactions");
            })
            .catch(() => {
                setApiError("Falha ao salvar a transação.");
            });
    };

    return (
        <>
            <div className="container">
                <h1 className="fs-2 text-center">Cadastro de Transações</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl isInvalid={errors.description && true}>
                        <FormLabel htmlFor="name">Descrição</FormLabel>
                        <Input
                            id="description"
                            placeholder="Descrição da transação"
                            {...register("description", {
                                required: "O campo descrição é obrigatório",
                            })}
                        />
                        <FormErrorMessage>
                            {errors.description && errors.description.message}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors.realValue && true}>
                        <FormLabel htmlFor="realValue">Valor</FormLabel>
                        <Input
                            id="realValue"
                            placeholder="0.0"
                            {...register("realValue", {
                                required: "O campo valor é obrigatório",
                                min: {
                                    value: 0.01,
                                    message: "O valor deve ser maior que zero",
                                },
                            })}
                            type="number"
                            step="any"
                        />

                        <FormErrorMessage>
                            {errors.realValue && errors.realValue.message}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors.account && true}>
                        <FormLabel htmlFor="account">Conta</FormLabel>

                        <Select
                            id="account"
                            {...register("account.id", {
                                required: "O campo conta é obrigatório",
                            })}
                            size="sm"
                        >
                            {accounts.map((account: IAccount) => (
                                <option key={account.id} value={account.id}>
                                    {account.description}
                                </option>
                            ))}
                        </Select>

                        <FormErrorMessage>
                            {errors.account && errors.account.message}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors.date && true}>
                        <FormLabel htmlFor="date">Valor</FormLabel>
                        <Input
                            id="date"
                            {...register("date", {
                                required: "O campo data é obrigatório",
                            })}
                            type="date"
                            step="any"
                        />

                        <FormErrorMessage>
                            {errors.date && errors.date.message}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors.typeTransaction && true}>
                        <FormLabel htmlFor="typeTransaction">Tipo</FormLabel>

                        <Select
                            id="typeTransaction"
                            size="sm"
                            {...register("typeTransaction", {
                                required: "O campo data é obrigatório",
                            })}
                        >
                            {types.map((type : string) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </Select>
                        <FormErrorMessage>
                            {errors.typeTransaction && errors.typeTransaction.message}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors.status && true}>
                        <FormLabel htmlFor="status">Status</FormLabel>

                        <Select
                            id="status"
                            size="sm"
                            {...register("status", {
                                required: "O campo data é obrigatório",
                            })}
                        >
                            {statuslist.map((status : string) => (
                                <option key={status} value={status}>
                                    {status}
                                </option>
                            ))}
                        </Select>
                        <FormErrorMessage>
                            {errors.status && errors.status.message}
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={errors.category && true}>
                        <FormLabel htmlFor="category">Categoria</FormLabel>

                        <Select
                            id="category"
                            size="sm"
                            {...register("category", {
                                required: "O campo data é obrigatório",
                            })}
                        >
                            {categoriesList.map((category : string) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </Select>
                        <FormErrorMessage>
                            {errors.category && errors.category.message}
                        </FormErrorMessage>
                    </FormControl>

                    <div className="text-center">
                        <Button
                            mt={4}
                            colorScheme="teal"
                            isLoading={isSubmitting}
                            type="submit"
                        >
                            Salvar
                        </Button>
                    </div>
                </form>

                {apiError && <div className="alert alert-danger">{apiError}</div>}
                <div className="text-center">
                    <Link to="/transactions">Voltar</Link>
                </div>
            </div>
        </>
    );
}