import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {IAccount, ITransaction} from "@/commons/interfaces";
import AccountService from "@/service/AccountService.ts";
import TransactionService from "@/service/TransactionService.ts";
import { Button, FormControl, FormErrorMessage, FormLabel, Input} from "@chakra-ui/react";
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
    // const [options, setOptions] = useState<{
    //     element: string
    // }[]>([]);
    // const [optionsType, setOptionsType] = useState<{
    //     element: string
    // }[]>([]);
    // const [optionsCategories, setoptionsCategories] = useState<{
    //     element: string
    // }[]>([]);

    // Executa ao carregar o componente
    useEffect(() => {
        loadData();
    }, [statuslist, types, categoriesList]);

    useEffect(() => {
        reset(entity);
    }, [entity, reset]);

    const loadData = async () => {
        // Busca a lista de categorias
        await AccountService.findAll()
            .then((response) => {
                // caso sucesso, adiciona a lista no state
                setAccounts(response.data);
                setApiError("false");
            })
            .catch(() => {
                setApiError("true");
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
                        fetchEnums(); // Chama a função para carregar os enums
                    //     setOptions(statuslist.map((element) => ({element})));
                    //     setOptionsType(types.map((element) => ({element})));
                    //     setoptionsCategories(categoriesList.map((element) => ({element})));
                    // } else {
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
    const fetchEnums = async () => {
        try {
            const [typeResponse, statusResponse, categoriesResponse] = await Promise.all([
                TransactionService.getenumtype(),
                TransactionService.getenumstatus(),
                TransactionService.getenumcategories()
            ]);

            setType(typeResponse.data);
            setStatus(statusResponse.data);
            setCategoriesList(categoriesResponse.data);

            setApiError("");
        } catch (error) {
            setApiError("");
        }
    };
    const onSubmit = (data: ITransaction) => {
        const transaction: ITransaction = {
            ...data,
            id: entity.id,
            description: entity.description,
            realValue: entity.realValue,
            typeTransaction: entity.typeTransaction,
            status: entity.status,
            date: entity.date,
            category: entity.category,
            account: {id: data.account.id, description: "", savedMoney: 0},
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
                <h1 className="fs-2 text-center">Cadastro de Transações - V2</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl isInvalid={errors.description && true}>
                        <FormLabel htmlFor="name">Description</FormLabel>
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

                    {/*<FormControl isInvalid={errors.price && true}>*/}
                    {/*    <FormLabel htmlFor="price">Preço</FormLabel>*/}
                    {/*    <Input*/}
                    {/*        id="price"*/}
                    {/*        placeholder="0.0"*/}
                    {/*        {...register("price", {*/}
                    {/*            required: "O campo preço é obrigatório",*/}
                    {/*            min: {*/}
                    {/*                value: 0.01,*/}
                    {/*                message: "O valor deve ser maior que zero",*/}
                    {/*            },*/}
                    {/*        })}*/}
                    {/*        type="number"*/}
                    {/*        step="any"*/}
                    {/*    />*/}

                    {/*    <FormErrorMessage>*/}
                    {/*        {errors.price && errors.price.message}*/}
                    {/*    </FormErrorMessage>*/}
                    {/*</FormControl>*/}

                    {/*<FormControl isInvalid={errors.description && true}>*/}
                    {/*    <FormLabel htmlFor="description">Descrição</FormLabel>*/}
                    {/*    <Textarea*/}
                    {/*        id="description"*/}
                    {/*        maxLength={1024}*/}
                    {/*        placeholder="Descrição do produto"*/}
                    {/*        {...register("description", {*/}
                    {/*            required: "O campo descrição é obrigatório",*/}
                    {/*            minLength: {*/}
                    {/*                value: 2,*/}
                    {/*                message: "O tamanho deve ser entre 2 e 1024 caracteres",*/}
                    {/*            },*/}
                    {/*            maxLength: {*/}
                    {/*                value: 1024,*/}
                    {/*                message: "O tamanho deve ser entre 2 e 1024 caracteres",*/}
                    {/*            },*/}
                    {/*        })}*/}
                    {/*        size="sm"*/}
                    {/*    />*/}
                    {/*    <FormErrorMessage>*/}
                    {/*        {errors.description && errors.description.message}*/}
                    {/*    </FormErrorMessage>*/}
                    {/*</FormControl>*/}

                    {/*<FormControl isInvalid={errors.account && true}>*/}
                    {/*    <FormLabel htmlFor="account">Categoria</FormLabel>*/}

                    {/*    <Select*/}
                    {/*        id="account"*/}
                    {/*        {...register("account.id", {*/}
                    {/*            required: "O campo categoria é obrigatório",*/}
                    {/*        })}*/}
                    {/*        size="sm"*/}
                    {/*    >*/}
                    {/*        {accounts.map((account: IAccount) => (*/}
                    {/*            <option key={account.id} value={account.id}>*/}
                    {/*                {account.name}*/}
                    {/*            </option>*/}
                    {/*        ))}*/}
                    {/*    </Select>*/}

                    {/*    <FormErrorMessage>*/}
                    {/*        {errors.description && errors.description.message}*/}
                    {/*    </FormErrorMessage>*/}
                    {/*</FormControl>*/}

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