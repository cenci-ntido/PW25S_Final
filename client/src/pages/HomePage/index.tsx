import {Card, CardBody, Center, Text} from "@chakra-ui/react";

export function HomePage() {
  return (
    <>
        <Card>
            <CardBody>
                <Center>
                    <Text colorScheme={'black'}>Últimas 5 receitas</Text>

                </Center>
            </CardBody>
        </Card>
    </>
  );
}
