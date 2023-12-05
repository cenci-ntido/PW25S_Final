import {

    Flex,
} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import TransactionService from "@/service/TransactionService.ts";
import {ListCard} from "@/components/ListCard";
import {IAccount, ITransaction} from "@/commons/interfaces.ts";
import {AccountsStats} from "@/components/AccountsStats";
import AccountService from "@/service/AccountService.ts";


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


    const totReceitas = transactions
        .filter((transaction: ITransaction) => transaction.typeTransaction === "RECEITA")
        .reduce((total, transaction) => total + transaction.realValue, 0);

    const totDespesas = transactions
        .filter((transaction: ITransaction) => transaction.typeTransaction === "DESPESA")
        .reduce((total, transaction) => total + transaction.realValue, 0);

    const saldo = totReceitas - totDespesas;


    return (
        <>
            <Flex>
                <ListCard transactionsList={transactions} title={"Últimas receitas"} type={"RECEITA"}
                          color={"green.100"}></ListCard>
                <ListCard transactionsList={transactions} title={"Últimas despesas"} type={"DESPESA"}
                          color={"red.100"}></ListCard>
                <AccountsStats saldo={saldo.toString()} accountsList={accounts} title={"Saldo de contas"}
                               color={"yellow.100"}></AccountsStats>
            </Flex>
        </>
    );
}
