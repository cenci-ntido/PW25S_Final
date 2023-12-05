import {Box, Button, Card, CardBody, CardFooter, CardHeader, Grid, GridItem, Heading, Text} from "@chakra-ui/react";
import {ITransaction} from "@/commons/interfaces.ts";
import {Link} from "react-router-dom";


interface ListCardProps {
    transactionsList: ITransaction[];
    title: string;
    type: string;
    color: string;
}

export function ListCard({transactionsList, title, type, color}: ListCardProps) {
    return (
        <Box width={'50%'} >
            <Card variant={'filled'} bgColor={color} margin={'2rem'}>
                <CardHeader>
                    <Heading size='md' textAlign={'center'}>{title}</Heading>
                </CardHeader>
                <CardBody>
                    <Grid templateColumns='repeat(2, 1fr)' gap={4}>
                        {transactionsList
                            .filter((transaction: ITransaction) => {
                                return transaction.typeTransaction === type as string;
                            })
                            .filter((transaction: ITransaction) => {
                                return transaction.typeTransaction === type as string;
                            })
                            .slice(0, 5)
                            .map((transaction: ITransaction) => (
                                <GridItem width={'100%'}>
                                    <Card width={'100%'}>
                                        <CardHeader bgColor={'blackAlpha.100'}>
                                            <Text fontWeight={'bold'}>{transaction.description}</Text>
                                        </CardHeader>
                                        <CardBody>
                                            <Text>Data: {transaction.date}</Text>
                                            <Text>Valor: R$ {transaction.realValue}</Text>
                                        </CardBody>
                                    </Card>
                                </GridItem>
                            ))}
                    </Grid>
                </CardBody>
                <CardFooter>
                    <Button colorScheme='teal'><Link to="/transactions">Acesse as transações</Link></Button>
                </CardFooter>
            </Card>
        </Box>
    );
}
