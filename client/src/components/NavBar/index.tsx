import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import AuthService from "@/service/AuthService";
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
import { ArrowForwardIcon } from "@chakra-ui/icons";

const theme = extendTheme({
    config: {
        initialColorMode: "dark",
    },
});

export function NavBar() {
    const location = useLocation();

    const [url, setUrl] = useState("");

    const onClickLogout = () => {
        AuthService.logout();
        window.location.reload();
    };

    useEffect(() => {
        setUrl(location.pathname);
    }, [location.pathname]);

    const onClick = () => {
        setUrl(location.pathname);
    };

    return (
        <ChakraProvider theme={theme}>
            <Box padding={5} background={"blackAlpha.900"}>
                <Flex justifyContent="space-between">
                    <Tabs variant="soft-rounded" colorScheme={"black"}>
                        <TabList>
                            <Tab
                                onClick={onClick}
                                aria-selected={url === "/"}
                            >
                                <NavLink
                                    to="/"
                                    style={{ color: "white" }}
                                >
                                    Home
                                </NavLink>
                            </Tab>
                            <Tab
                                onClick={onClick}
                                aria-selected={url === "/accounts"}
                            >
                                <NavLink
                                    to="/accounts"
                                    style={{ color: "white" }}
                                >
                                    Contas
                                </NavLink>
                            </Tab>
                            <Tab
                                onClick={onClick}
                                aria-selected={url === "/transactions"}
                            >
                                <NavLink
                                    to="/transactions"
                                    style={{ color: "white" }}
                                >
                                    Transações
                                </NavLink>
                            </Tab>
                        </TabList>
                    </Tabs>
                    <Button
                        onClick={onClickLogout}
                        variant={"outline"}
                        colorScheme={"red"}
                        rightIcon={<ArrowForwardIcon />}
                    >
                        Sair
                    </Button>
                </Flex>
            </Box>
        </ChakraProvider>
    );
}
