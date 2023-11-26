import {NavLink} from "react-router-dom";
import AuthService from "@/services/AuthService";
import {
    Tabs,
    TabList,
    Tab,
    Box,
    Button,
    Flex,
    ChakraProvider,
    extendTheme,
} from "@chakra-ui/react";
import {ArrowForwardIcon} from "@chakra-ui/icons";

const theme = extendTheme({
    config: {
        initialColorMode: "dark",
    },
});

export function NavBar() {
    const onClickLogout = () => {
        AuthService.logout();
        window.location.reload();
    };

    return (
        <ChakraProvider theme={theme}>
            <Box padding={5} background={"blackAlpha.900"}>
                <Flex justifyContent="space-between">
                    <Tabs variant="soft-rounded" colorScheme={"black"}>
                        <TabList>
                            <Tab>
                                <NavLink
                                    to="/"
                                    style={{color: "white"}} // Defina a cor do texto para branco
                                >
                                    Home
                                </NavLink>
                            </Tab>
                            <Tab>
                                <NavLink
                                    to="/accounts"
                                    style={{color: "white"}} // Defina a cor do texto para branco
                                >
                                    Contas
                                </NavLink>
                            </Tab>
                            <Tab>
                                <NavLink
                                    to="/transactions"
                                    style={{color: "white"}} // Defina a cor do texto para branco
                                >
                                    Transações
                                </NavLink>
                            </Tab>
                        </TabList>
                    </Tabs>
                    <Button onClick={onClickLogout} variant={"outline"} colorScheme={"red"} rightIcon={<ArrowForwardIcon />}>Sair</Button>
                </Flex>
            </Box>
        </ChakraProvider>
    );
}
