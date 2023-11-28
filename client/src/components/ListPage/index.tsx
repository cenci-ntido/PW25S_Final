import {useEffect, useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import {BsThreeDotsVertical, BsPencilSquare, BsTrash} from "react-icons/bs";
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
    MenuItem,
    Button,
} from "@chakra-ui/react";
import {AddIcon} from "@chakra-ui/icons";

interface ListPageProps<T> {
    data: T[];
    loadData: () => void;
    onEdit: (path: string) => void;
    onRemove: (id: number) => void;
    addButtonLink: string;
    pageTitle: string;
    pageURL: string;
}

export function ListPage<T>({
                                data,
                                loadData,
                                onEdit,
                                onRemove,
                                addButtonLink,
                                pageTitle,
                                pageURL
                            }: ListPageProps<T>) {
    const [apiError, setApiError] = useState<string>("");
    const [showDeleteMessage, setShowDeleteMessage] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        loadData();
    }, [loadData]);

    const handleRemove = (id: number) => {
        onRemove(id);
    };

    return (
        <>
            <div className="container">
                <div className="text-center">
                    <h1 className="h3 mb-3 fw-normal">{pageTitle}</h1>
                </div>
                <div className="text-center">
                    <Button colorScheme={'teal'}>
                        <Link to={addButtonLink}>
                            <AddIcon></AddIcon>
                        </Link>
                    </Button>
                </div>
                <TableContainer>
                    <Table>
                        <TableCaption>{pageTitle}</TableCaption>
                        <Thead>
                            <Tr>
                                <Th>#</Th>
                                <Th>Descrição</Th>
                                <Th>Ações</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {data.map((item: any) => (
                                <Tr
                                    key={item.id}
                                    _hover={{cursor: "pointer", background: "#eee"}}
                                >
                                    <Td>{item.id}</Td>
                                    <Td>{item.description}</Td>
                                    <Td>
                                        <Menu>
                                            <MenuButton
                                                as={IconButton}
                                                aria-label="Actions"
                                                icon={<BsThreeDotsVertical size={20}/>}
                                                variant="ghost"
                                            />
                                            <MenuList>
                                                <MenuItem
                                                    icon={<BsPencilSquare/>}
                                                    onClick={() => onEdit(`${pageURL}/${item.id}`)}
                                                >
                                                    Editar
                                                </MenuItem>
                                                <MenuItem
                                                    icon={<BsTrash/>}
                                                    onClick={() => handleRemove(item.id)}
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
                {showDeleteMessage && (
                    <div className="alert alert-success">
                        {pageTitle.replace("Lista de ", "")} removido com sucesso!
                    </div>
                )}
            </div>
        </>
    );
}
