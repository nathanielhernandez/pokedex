import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import ThemeContextProvider from "./context/ThemeContext";
import Header from "./components/Header";
import Directory from "./components/Directory";
import PokemonProvider from "./context/PokemonContext";

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeContextProvider>
      <Header />
      <QueryClientProvider client={queryClient}>
        <PokemonProvider>
          <Directory />
        </PokemonProvider>
      </QueryClientProvider>
    </ThemeContextProvider>
  );
}

export default App;
