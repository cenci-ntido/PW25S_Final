import {Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, Text} from "@chakra-ui/react";
import {Link} from "react-router-dom";

export function HomePage() {
    return (
        <>
            <Flex>
                <Box width={'50%'} >
                    <Card variant={'filled'}>

                        <CardHeader>
                            <Heading size='md' textAlign={'center'}>Saldo das contas</Heading>
                        </CardHeader>
                        <CardBody>
                            <Text></Text>
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
