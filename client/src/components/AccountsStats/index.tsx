import {
    Box,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Grid,
    GridItem,
    Heading,
    Stat, StatHelpText, StatLabel, StatNumber,
} from "@chakra-ui/react";
import {IAccount} from "@/commons/interfaces.ts";
import {Link} from "react-router-dom";


interface AccountsStatsProps {
    accountsList: IAccount[];
    title: string;
    color: string;
    saldo: string;
}

export function AccountsStats({accountsList, title, color, saldo}: AccountsStatsProps) {
    return (
        <Box width={'50%'}>
            <Card variant={'filled'} bgColor={color} margin={'2rem'}>
                <CardHeader>
                    <Heading size='md' textAlign={'center'}>{title}</Heading>
                </CardHeader>
                <CardBody>
                    <Grid templateColumns='repeat(2, 1fr)' gap={4}>
                        {accountsList
                            .map((account: IAccount) => (
                                <GridItem width={'100%'} bgColor={'blackAlpha.100'} padding={'1rem'} rounded={'0.5rem'}>
                                    <Stat>
                                        <StatLabel>{account.description}</StatLabel>
                                        <StatNumber>R$ {saldo}</StatNumber>
                                        <StatHelpText>Guardado: R$ {account.savedMoney}</StatHelpText>
                                    </Stat>
                                    {/*<Card width={'100%'}>*/}
                                    {/*    <CardHeader bgColor={'blackAlpha.100'}>*/}
                                    {/*        <Text fontWeight={'bold'}>{transaction.description}</Text>*/}
                                    {/*    </CardHeader>*/}
                                    {/*    <CardBody>*/}
                                    {/*        <Text>Data: {transaction.date}</Text>*/}
                                    {/*        <Text>Valor: R$ {transaction.realValue}</Text>*/}
                                    {/*    </CardBody>*/}
                                    {/*</Card>*/}
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
