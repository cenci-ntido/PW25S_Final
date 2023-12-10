import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {IAccount, ITransfer} from "@/commons/interfaces";
import AccountService from "@/service/AccountService.ts";
import TransferService from "@/service/TransferService.ts";
import {Button, FormControl, FormErrorMessage, FormLabel, Input, Select} from "@chakra-ui/react";
// import {Select} from "@/components/Select";
import {useForm} from "react-hook-form";

export function TransferForm() {
    const {
        handleSubmit,
        register,
        formState: {errors, isSubmitting},
        // reset,
    } = useForm<ITransfer>();
    const [apiError, setApiError] = useState("");
    const [accounts, setAccounts] = useState<IAccount[]>([]);
    const navigate = useNavigate();
    const {id} = useParams();
    const [entity, setEntity] = useState<ITransfer>({
        id: undefined,
        description: "",
        realValue: 0,
        date: "",
        accountOrigin: {id: undefined, description: "", savedMoney: 0},
        accountDestiny: {id: undefined, description: "", savedMoney: 0},
    });


    useEffect(() => {
        loadData()
    }, []);


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
            TransferService.findById(parseInt(id))
                .then((response) => {
                    if (response.data) {
                        setEntity({
                            id: response.data.id,
                            description: response.data.description,
                            realValue: response.data.realValue,
                            date: response.data.date,
                            accountOrigin: {id: response.data.accountOrigin.id, description: "", savedMoney: 0},
                            accountDestiny: {id: response.data.accountDestiny.id, description: "", savedMoney: 0},
                        });
                        setApiError("");

                    } else {
                        setApiError("Falha ao carregar a transferência");
                    }
                })
                .catch(() => {
                    setApiError("Falha ao carregar a transferência");
                });

        } else {
            setEntity((previousEntity) => {
                return {
                    ...previousEntity,
                    accountOrigin: {id: accounts[0]?.id, description: "", savedMoney: 0},
                    accountDestiny: {id: accounts[1]?.id, description: "", savedMoney: 0},
                };
            });
        }
    };



    const onSubmit = (data: ITransfer) => {
        const trasnfer: ITransfer = {
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


        TransferService.save(trasnfer)
            .then(() => {
                navigate("/transfers");
            })
            .catch(() => {
                setApiError("Falha ao salvar a transferência.");
            });
    };

    return (
        <>
            <div className="container">
                <h1 className="fs-2 text-center">Cadastro de Transferências</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl isInvalid={errors.description && true}>
                        <FormLabel htmlFor="name">Descrição</FormLabel>
                        <Input
                            id="description"
                            placeholder="Descrição da transferência"
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

                    <FormControl isInvalid={errors.accountOrigin && true}>
                        <FormLabel htmlFor="accountOrigin">Conta de Origem</FormLabel>

                        <Select
                            id="accountOrigin"
                            {...register("accountOrigin.id", {
                                required: "O campo conta de origem é obrigatório",
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
                            {errors.accountOrigin && errors.accountOrigin.message}
                        </FormErrorMessage>
                    </FormControl>


                    <FormControl isInvalid={errors.accountDestiny && true}>
                        <FormLabel htmlFor="accountDestiny">Conta de Destino</FormLabel>

                        <Select
                            id="accountDestiny"
                            {...register("accountDestiny.id", {
                                required: "O campo conta de destino é obrigatório",
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
                            {errors.accountOrigin && errors.accountOrigin.message}
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
                    <Link to="/transfers">Voltar</Link>
                </div>
            </div>
        </>
    );
}