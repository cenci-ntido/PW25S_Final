import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IAccount, ITransaction } from "@/commons/interfaces";
import AccountService from "@/service/AccountService.ts";
import TransactionService from "@/service/TransactionService.ts";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Textarea,
  Select,
  Button,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

export function TransactionForm() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ITransaction>();
  const [apiError, setApiError] = useState("");
  const [accounts, setAccounts] = useState<IAccount[]>([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const [entity, setEntity] = useState<ITransaction>({
    id: undefined,
    description: "",
    realValue: 0,
    date: "",
    account: { id: undefined, description: "", savedMoney: 0},
    category: "",
    status: "",
    type: ""
  });

  // Executa ao carregar o componente
  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    reset(entity);
  }, [entity, reset]);

  const loadData = async () => {
    // Busca a lista de categorias
    await AccountService.findAll()
      .then((response) => {
        // caso sucesso, adiciona a lista no state
        setAccounts(response.data);
        setApiError("");
      })
      .catch(() => {
        setApiError("Falha ao carregar a combo de contas.");
      });

    if (id) {
      TransactionService.findById(parseInt(id))
        .then((response) => {
          if (response.data) {
            setEntity({
              id: response.data.id,
              description:  response.data.description,
              realValue: response.data.realValue,
              date: response.data.date,
              account: { id: response.data.account.id, description: "", savedMoney: 0},
              category: response.data.category,
              status: response.data.status,
              type: response.data.type
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
          account: { id: accounts[0]?.id, description: "", savedMoney: 0 },
        };
      });
    }
  };

  const onSubmit = (data: ITransaction) => {
    const transaction: ITransaction = {
      ...data,
      id: entity.id,
      description:  entity.description,
      realValue: entity.realValue,
      date: entity.date,
      category: entity.category,
      status: entity.status,
      type: entity.type,
      account: { id: data.account.id, description: "", savedMoney: 0 }
    };

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
        <div className="text-center">
          <h1 className="h3 mb-3 fw-normal">Lista de Transações</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>

          <FormControl isInvalid={errors.description && true}>
            <FormLabel htmlFor="description">Descrição</FormLabel>
            <Textarea
              id="description"
              maxLength={1024}
              placeholder="Descrição do produto"
              {...register("description", {
                required: "O campo descrição é obrigatório",
                minLength: {
                  value: 2,
                  message: "O tamanho deve ser entre 2 e 1024 caracteres",
                },
                maxLength: {
                  value: 1024,
                  message: "O tamanho deve ser entre 2 e 1024 caracteres",
                },
              })}
              size="sm"
            />
            <FormErrorMessage>
              {errors.description && errors.description.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.account && true}>
            <FormLabel htmlFor="category">Conta</FormLabel>

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
