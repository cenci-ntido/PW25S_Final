import {
    Box,
    Button,
    Card, CardBody, CardFooter, CardHeader,

    Flex, Grid, GridItem, Heading, Stat, StatHelpText, StatLabel, StatNumber,
} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import TransactionService from "@/service/TransactionService.ts";
import {ListCard} from "@/components/ListCard";
import {IAccount, ITransaction} from "@/commons/interfaces.ts";
import AccountService from "@/service/AccountService.ts";
import {Link} from "react-router-dom";


export function HomePage() {
    const [transactions, setTransactions] = useState<ITransaction[]>([]);
    const [accounts, setAccounts] = useState<IAccount[]>([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        TransactionService.findAll()
            .then((response) => {
                setTransactions(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
        AccountService.findAll()
            .then((response) => {
                setAccounts(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };


    // const totReceitas = transactions
    //     .filter((transaction: ITransaction) => transaction.typeTransaction === "RECEITA")
    //     .reduce((total, transaction) => total + transaction.realValue, 0);
    //
    // const totDespesas = transactions
    //     .filter((transaction: ITransaction) => transaction.typeTransaction === "DESPESA")
    //     .reduce((total, transaction) => total + transaction.realValue, 0);

    const calculateAccountBalance = (accountID: number | undefined) => {
        const accountTransactions = transactions.filter(
            (transaction) => transaction.account.id === accountID
        );

        const accountReceitas = accountTransactions
            .filter((transaction) => transaction.typeTransaction === "RECEITA")
            .reduce((total, transaction) => total + transaction.realValue, 0);

        const accountDespesas = accountTransactions
            .filter((transaction) => transaction.typeTransaction === "DESPESA")
            .reduce((total, transaction) => total + transaction.realValue, 0);

        return accountReceitas - accountDespesas;
    };


    return (
        <>
            <Flex>
                <ListCard transactionsList={transactions} title={"Últimas receitas"} type={"RECEITA"}
                          color={"green.100"}></ListCard>
                <ListCard transactionsList={transactions} title={"Últimas despesas"} type={"DESPESA"}
                          color={"red.100"}></ListCard>
                <Box width={'50%'}>
                    <Card variant={'filled'} bgColor={'yellow.100'} margin={'2rem'}>
                        <CardHeader>
                            <Heading size='md' textAlign={'center'}>Saldo das contas</Heading>
                        </CardHeader>
                        <CardBody>
                            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                                {accounts.map((account: IAccount) => <GridItem
                                    key={account.id}
                                    width="100%"
                                    bgColor="blackAlpha.100"
                                    padding="1rem"
                                    rounded="0.5rem"
                                >
                                    <Stat>
                                        <StatLabel>{account.description}</StatLabel>
                                        <StatNumber>{calculateAccountBalance(account.id)}</StatNumber>
                                        <StatHelpText>Guardado: R$ {account.savedMoney}</StatHelpText>
                                    </Stat>
                                </GridItem>)}
                            </Grid>
                        </CardBody>
                        <CardFooter>
                            <Button colorScheme='teal'><Link to="/transactions">Acesse as transações</Link></Button>
                        </CardFooter>
                    </Card>
                </Box>
            </Flex>
        </>
    );
}
