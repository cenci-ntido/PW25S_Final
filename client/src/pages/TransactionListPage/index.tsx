import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ITransaction } from "@/commons/interfaces";
import TransactionService from "@/service/TransactionService.ts";
import {
  BsThreeDotsVertical,
  BsPencilSquare,
  BsTrash,
} from "react-icons/bs";
import {
    TableContainer,
    Table,
    TableCaption,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    Menu,
    MenuButton,
    IconButton,
    MenuList,
    MenuItem, Button,
} from "@chakra-ui/react";

export function TransactionListPage() {
  const [data, setData] = useState<ITransaction[]>([]);
  const [apiError, setApiError] = useState("");
  const [showDeleteMessage, setShowDeleteMessage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    TransactionService.findAll()
      .then((response) => {
        setData(response.data);
        setApiError("");
      })
      .catch(() => {
        setApiError("Falha ao carregar a lista de transações");
      });
  };

  const onEdit = (path: string) => {
    navigate(path);
  };

  const onRemove = (id: number) => {
    TransactionService.remove(id)
      .then(() => {
        setShowDeleteMessage(true);
        loadData();
        setTimeout(() => {
          setShowDeleteMessage(false);
        }, 1500);
        setApiError("");
      })
      .catch(() => {
        setApiError("Falha ao remover a transação");
      });
  };

  return (
    <>
      <div className="container">
        <div className="text-center">
          <h1 className="h3 mb-3 fw-normal">Lista de Transações</h1>
        </div>
        <div className="text-center">

            <Button colorScheme={'teal'}>
                <Link  to="/transactions/new">
                    Nova Transação
                </Link>
            </Button>
        </div>
        <TableContainer>
          <Table>
            <TableCaption>Lista de Transações</TableCaption>
            <Thead>
              <Tr>
                <Th>#</Th>
                <Th>Descrição</Th>
                <Th isNumeric>Valor</Th>
                <Th>Data</Th>
                <Th>Conta</Th>
                <Th>Categoria</Th>
                <Th>Status</Th>
                <Th>Tipo</Th>
                <Th>Ações</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((transaction: ITransaction) => (
                <Tr
                  key={transaction.id}
                  _hover={{ cursor: "pointer", background: "#eee" }}
                >
                  <Td>{transaction.id}</Td>
                  <Td>{transaction.description}</Td>
                  <Td isNumeric>{transaction.realValue}</Td>
                  <Td>{transaction.date.toString()}</Td>
                  <Td>{transaction.account?.description}</Td>
                  <Td>{transaction.category}</Td>
                  <Td>{transaction.status}</Td>
                  <Td>{transaction.type}</Td>
                  <Td>
                    <Menu>
                      <MenuButton
                        as={IconButton}
                        aria-label="Actions"
                        icon={<BsThreeDotsVertical size={20} />}
                        variant="ghost"
                      />
                      <MenuList>
                        <MenuItem
                          icon={<BsPencilSquare />}
                          onClick={() => onEdit(`/transactions/${transaction.id}`)}
                        >
                          Editar
                        </MenuItem>
                        <MenuItem
                          icon={<BsTrash />}
                          onClick={() => onRemove(transaction.id!)}
                        >
                          Remover
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        {apiError && <div className="alert alert-danger">{apiError}</div>}
        {showDeleteMessage && <div className="alert alert-success">Transação removido com sucesso!</div>}
      </div>
    </>
  );
}
