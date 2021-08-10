import { Box, ChakraProvider, extendTheme } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import { AppCanvas } from "./components/AppCanvas";

const queryClient = new QueryClient();
const theme = extendTheme({ config: { initialColorMode: "light" } });

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ChakraProvider theme={theme}>
                <Box w="100%" h="100%">
                    <AppCanvas />
                </Box>
            </ChakraProvider>
        </QueryClientProvider>
    );
}

export default App;
